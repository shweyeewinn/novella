import { mkdir, writeFile } from "fs/promises";
import { attachPaymentProofToOrder, findOrderById } from "@/lib/orders/repository";
import { paymentProofAbsolutePath } from "@/lib/orders/paymentProofPath";
import path from "path";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function extensionForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

export async function savePaymentProof(
  orderId: string,
  file: File
): Promise<{ ok: true } | { ok: false; error: string }> {
  const order = await findOrderById(orderId.trim());
  if (!order) {
    return { ok: false, error: "Order not found." };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: "Please upload a JPG, PNG, or WebP image." };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 5 MB or smaller." };
  }

  const ext = extensionForMime(file.type);
  const filename = `${order.id}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const filePath = paymentProofAbsolutePath(filename);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, bytes);

  const updated = await attachPaymentProofToOrder(order.id, {
    filename,
    mimeType: file.type,
    uploadedAt: new Date().toISOString(),
  });

  if (!updated) {
    return { ok: false, error: "Could not update order." };
  }

  return { ok: true };
}
