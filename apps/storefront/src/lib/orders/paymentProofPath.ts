import path from "path";

const PROOF_DIR = path.join(process.cwd(), ".data", "payment-proofs");

export function paymentProofAbsolutePath(filename: string): string {
  const safe = path.basename(filename);
  return path.join(PROOF_DIR, safe);
}
