document.documentElement.classList.add('js');

function createSupabaseClient() {
  const config = window.AURA_SUPABASE;

  if (!config || !config.enabled || !window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(config.url, config.anonKey);
}

function setStatusMessage(element, message, isError) {
  if (!element) return;

  element.hidden = !message;
  element.textContent = message || '';
  element.dataset.statusType = isError ? 'error' : 'success';
}

async function syncContactFormToSupabase(form, client) {
  const config = window.AURA_SUPABASE;
  const status = form.querySelector('[data-supabase-status]');
  const submitButton = form.querySelector('button[type="submit"]');

  if (!config?.contactTable) {
    return true;
  }

  const payload = {
    name: form.elements['contact[name]']?.value?.trim() || null,
    email: form.elements['contact[email]']?.value?.trim() || null,
    message: form.elements['contact[body]']?.value?.trim() || null,
    source: 'shopify-theme-contact-form',
    page_url: window.location.href,
    shop_domain: config.shop || window.location.hostname
  };

  if (submitButton) submitButton.disabled = true;
  setStatusMessage(status, 'Saving your message...', false);

  const { error } = await client.from(config.contactTable).insert(payload);

  if (submitButton) submitButton.disabled = false;

  if (error) {
    console.error('Supabase contact sync failed', error);
    setStatusMessage(status, 'We could not save this to Supabase yet. Your Shopify message will still send.', true);
    return false;
  }

  setStatusMessage(status, 'Saved to our contact database. Sending your message...', false);
  return true;
}

function initSupabaseContactForm() {
  const form = document.querySelector('[data-supabase-contact-form]');
  const client = createSupabaseClient();

  if (!form || !client) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    if (form.dataset.supabaseSubmitting === 'true') {
      return;
    }

    event.preventDefault();
    form.dataset.supabaseSubmitting = 'true';

    try {
      await syncContactFormToSupabase(form, client);
    } finally {
      form.submit();
    }
  });
}

initSupabaseContactForm();
