import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminAccess } from "@/lib/server-auth";

export async function POST(request: Request) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const batchNumber = String(formData.get("batchNumber") ?? "").trim();

  if (!(file instanceof File) || !productSlug || !batchNumber) {
    return NextResponse.json({ error: "File, productSlug, and batchNumber are required" }, { status: 400 });
  }

  const fileExtension = file.name.split(".").pop() || "pdf";
  const storagePath = `${productSlug}/${batchNumber.toLowerCase()}.${fileExtension}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from("coa")
    .upload(storagePath, arrayBuffer, {
      contentType: file.type || "application/pdf",
      upsert: true
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("coa").getPublicUrl(storagePath);

  return NextResponse.json({
    fileUrl: data.publicUrl,
    storagePath: `/coa/${storagePath}`
  });
}
