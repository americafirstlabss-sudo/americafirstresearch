"use client";

import { useState } from "react";

type LabResult = {
  id: string;
  product_name: string;
  batch_number: string;
  test_date?: string;
  lab_name?: string;
  purity?: number | null;
  file_url: string;
  storage_path?: string | null;
};

const blankState = {
  productName: "",
  batchNumber: "",
  testDate: "",
  labName: "",
  purity: "",
  fileUrl: "",
  storagePath: "",
  productSlug: "",
  file: null as File | null
};

export function LabResultsManager({ initialResults }: { initialResults: LabResult[] }) {
  const [results, setResults] = useState(initialResults);
  const [form, setForm] = useState(blankState);
  const [status, setStatus] = useState("Upload a PDF to Supabase Storage or paste a direct file URL.");

  async function uploadFile() {
    if (!form.file || !form.productSlug || !form.batchNumber) {
      setStatus("Select a PDF, product slug, and batch number first.");
      return null;
    }

    setStatus("Uploading PDF...");
    const data = new FormData();
    data.append("file", form.file);
    data.append("productSlug", form.productSlug);
    data.append("batchNumber", form.batchNumber);

    const response = await fetch("/api/admin/lab-results/upload", {
      method: "POST",
      body: data
    });
    const payload = await response.json();
    if (!response.ok) {
      setStatus(payload.error ?? "Upload failed.");
      return null;
    }

    setForm((current) => ({
      ...current,
      fileUrl: payload.fileUrl,
      storagePath: payload.storagePath
    }));
    setStatus("PDF uploaded. Save the COA entry to publish it.");
    return payload;
  }

  async function saveResult(formData: FormData) {
    let fileUrl = String(formData.get("fileUrl") ?? "").trim();
    let storagePath = String(formData.get("storagePath") ?? "").trim();

    if (!fileUrl && form.file) {
      const upload = await uploadFile();
      if (!upload) return;
      fileUrl = upload.fileUrl;
      storagePath = upload.storagePath;
    }

    if (!fileUrl) {
      setStatus("Add a file URL or upload a PDF before saving.");
      return;
    }

    setStatus("Saving COA entry...");
    const payload = {
      productName: formData.get("productName"),
      batchNumber: formData.get("batchNumber"),
      testDate: formData.get("testDate"),
      labName: formData.get("labName"),
      purity: formData.get("purity"),
      fileUrl,
      storagePath
    };

    const response = await fetch("/api/admin/lab-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? "Could not save COA entry.");
      return;
    }

    setResults((current) => [data.labResult, ...current]);
    setForm(blankState);
    setStatus("COA entry saved.");
  }

  async function removeResult(id: string) {
    setStatus("Removing COA entry...");
    const response = await fetch(`/api/admin/lab-results?id=${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "Could not remove COA entry.");
      return;
    }

    setResults((current) => current.filter((item) => item.id !== id));
    setStatus("COA entry removed.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="panel p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">COA Entries</h3>
          <p className="text-sm text-white/45">{results.length} results</p>
        </div>
        <div className="mt-5 space-y-3">
          {results.map((result) => (
            <div key={result.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{result.product_name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">{result.batch_number}</p>
                  <p className="mt-2 text-sm text-white/58">{result.lab_name || "No lab name"} • {result.purity ? `${result.purity}% purity` : "Purity N/A"}</p>
                </div>
                <button type="button" onClick={() => removeResult(result.id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:text-white">
                  Remove
                </button>
              </div>
              <a href={result.file_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-[#9c7a2b] hover:text-white">
                Open PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      <form action={saveResult} className="panel p-6">
        <h3 className="text-xl font-semibold text-white">Add COA</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input name="productName" value={form.productName} onChange={(event) => setForm((current) => ({ ...current, productName: event.target.value }))} placeholder="Product Name" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="batchNumber" value={form.batchNumber} onChange={(event) => setForm((current) => ({ ...current, batchNumber: event.target.value }))} placeholder="Batch Number" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="testDate" type="date" value={form.testDate} onChange={(event) => setForm((current) => ({ ...current, testDate: event.target.value }))} className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="labName" value={form.labName} onChange={(event) => setForm((current) => ({ ...current, labName: event.target.value }))} placeholder="Lab Name" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="purity" value={form.purity} onChange={(event) => setForm((current) => ({ ...current, purity: event.target.value }))} placeholder="Purity %" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="productSlug" value={form.productSlug} onChange={(event) => setForm((current) => ({ ...current, productSlug: event.target.value }))} placeholder="product slug (e.g. bpc157)" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="fileUrl" value={form.fileUrl} onChange={(event) => setForm((current) => ({ ...current, fileUrl: event.target.value }))} placeholder="File URL" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="storagePath" value={form.storagePath} onChange={(event) => setForm((current) => ({ ...current, storagePath: event.target.value }))} placeholder="Storage Path" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input type="file" accept="application/pdf" onChange={(event) => setForm((current) => ({ ...current, file: event.target.files?.[0] ?? null }))} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white md:col-span-2" />
        </div>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={uploadFile} className="button-secondary">
            Upload PDF
          </button>
          <button type="submit" className="button-primary">
            Save COA
          </button>
        </div>
        <p className="mt-4 text-sm text-white/50">{status}</p>
      </form>
    </div>
  );
}
