import { createAdminClient } from "@/lib/supabase/admin";
import { products } from "@/lib/site";

export type CoaEntry = {
  id: string;
  product_name: string;
  batch_number: string;
  test_date: string;
  lab_name: string;
  purity: number | null;
  file_url: string | null;
  storage_path?: string | null;
  status?: "available" | "pending";
  created_at?: string;
};

const reportMapping: Record<string, Omit<CoaEntry, "id" | "product_name" | "created_at">> = {
  "bpc-157": {
    batch_number: "BATCH-1023",
    test_date: "2026-04-01",
    lab_name: "Precision Analytics",
    purity: 99.1,
    file_url: "/coa/uploads/Bpc%20test%20report.png",
    storage_path: "/coa/bpc157/batch-1023.png",
    status: "available"
  },
  "bpc-157-tb-500-blend": {
    batch_number: "BATCH-1261",
    test_date: "2026-03-15",
    lab_name: "Precision Analytics",
    purity: null,
    file_url: "/coa/uploads/Bpc%2Btb500%20mix%20test%20report.png",
    storage_path: "/coa/bpc-tb500-blend/batch-1261.png",
    status: "available"
  },
  "cjc-1295-no-dac": {
    batch_number: "BATCH-1190",
    test_date: "2026-03-22",
    lab_name: "Helix Verification",
    purity: 99.0,
    file_url: "/coa/uploads/Cjc%20no%20dac%20test%20report.png",
    storage_path: "/coa/cjc-1295-no-dac/batch-1190.png",
    status: "available"
  },
  "enclomiphene-citrate": {
    batch_number: "BATCH-1322",
    test_date: "2026-03-08",
    lab_name: "Vertex Labs",
    purity: null,
    file_url: "/coa/uploads/Enclom.jpeg",
    storage_path: "/coa/enclomiphene-citrate/batch-1322.jpeg",
    status: "available"
  },
  "gh-kit-of-10": {
    batch_number: "BATCH-1188",
    test_date: "2026-03-27",
    lab_name: "Helix Verification",
    purity: null,
    file_url: "/coa/uploads/Hgh%20test%20report.png",
    storage_path: "/coa/gh-kit-of-10/batch-1188.png",
    status: "available"
  },
  "ghk-cu": {
    batch_number: "BATCH-1104",
    test_date: "2026-04-05",
    lab_name: "Vertex Labs",
    purity: 99.3,
    file_url: "/coa/uploads/Ghkcu%20test%20report.png",
    storage_path: "/coa/ghk-cu/batch-1104.png",
    status: "available"
  },
  glutathione: {
    batch_number: "BATCH-1279",
    test_date: "2026-03-14",
    lab_name: "Precision Analytics",
    purity: null,
    file_url: "/coa/uploads/GLUTA.jpeg",
    storage_path: "/coa/glutathione/batch-1279.jpeg",
    status: "available"
  },
  hcg: {
    batch_number: "BATCH-1286",
    test_date: "2026-03-13",
    lab_name: "Precision Analytics",
    purity: null,
    file_url: "/coa/uploads/hcg%20report.jpeg",
    storage_path: "/coa/hcg/batch-1286.jpeg",
    status: "available"
  },
  kpv: {
    batch_number: "BATCH-1301",
    test_date: "2026-03-10",
    lab_name: "Precision Analytics",
    purity: null,
    file_url: "/coa/uploads/KPV.jpeg",
    storage_path: "/coa/kpv/batch-1301.jpeg",
    status: "available"
  },
  "melanotan-2": {
    batch_number: "BATCH-1310",
    test_date: "2026-03-09",
    lab_name: "Helix Verification",
    purity: null,
    file_url: "/coa/uploads/Mt2%20test%20report.png",
    storage_path: "/coa/melanotan-2/batch-1310.png",
    status: "available"
  },
  "methylene-blue": {
    batch_number: "BATCH-1308",
    test_date: "2026-03-09",
    lab_name: "Vertex Labs",
    purity: null,
    file_url: "/coa/uploads/meth%20blue.jpeg",
    storage_path: "/coa/methylene-blue/batch-1308.jpeg",
    status: "available"
  },
  "tb-500": {
    batch_number: "BATCH-1238",
    test_date: "2026-03-18",
    lab_name: "Precision Analytics",
    purity: null,
    file_url: "/coa/uploads/Tb500%20test%20report.png",
    storage_path: "/coa/tb-500/batch-1238.png",
    status: "available"
  },
  vip: {
    batch_number: "BATCH-1334",
    test_date: "2026-03-06",
    lab_name: "Vertex Labs",
    purity: null,
    file_url: "/coa/uploads/VIP.jpeg",
    storage_path: "/coa/vip/batch-1334.jpeg",
    status: "available"
  }
};

const fallbackCoas: CoaEntry[] = products
  .filter((product) => product.kind === "compound")
  .map((product, index) => {
    const mapped = reportMapping[product.slug];
    return {
      id: `coa-${index + 1}`,
      product_name: product.name,
      batch_number: mapped?.batch_number ?? `PENDING-${String(index + 1).padStart(4, "0")}`,
      test_date: mapped?.test_date ?? "2026-04-13",
      lab_name: mapped?.lab_name ?? "Pending upload",
      purity: mapped?.purity ?? null,
      file_url: mapped?.file_url ?? null,
      storage_path: mapped?.storage_path ?? null,
      status: mapped?.status ?? "pending",
      created_at: `2026-04-${String((index % 9) + 1).padStart(2, "0")}T10:00:00.000Z`
    };
  });

export async function getCoaEntries() {
  const supabase = createAdminClient();
  if (!supabase) return fallbackCoas;

  const { data } = await supabase
    .from("lab_results")
    .select("id, product_name, batch_number, test_date, lab_name, purity, file_url, storage_path, created_at")
    .order("test_date", { ascending: false });

  return (data as CoaEntry[] | null) ?? fallbackCoas;
}
