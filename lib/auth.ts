export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const admins = getAdminEmails();
  if (!admins.length) return true;
  return admins.includes(email.toLowerCase());
}
