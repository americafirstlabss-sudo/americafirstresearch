import crypto from "crypto";

export function buildBankfulSignature(payload: Record<string, string>) {
  const stringToHash = Object.entries(payload)
    .filter(([, value]) => value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}${value}`)
    .join("");

  return crypto.createHash("sha256").update(stringToHash, "utf8").digest("hex");
}

export function buildHostedBankfulSignature(payload: Record<string, string>, secret: string) {
  const stringToHash = Object.entries(payload)
    .filter(([key, value]) => key !== "signature" && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}${value}`)
    .join("");

  return crypto.createHmac("sha256", secret).update(stringToHash, "utf8").digest("hex");
}
