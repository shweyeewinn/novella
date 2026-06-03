"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";

type PaymentProofUploadProps = {
  orderId: string;
  alreadyUploaded?: boolean;
};

export default function PaymentProofUpload({
  orderId,
  alreadyUploaded = false,
}: PaymentProofUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(alreadyUploaded);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) {
      setError("Please choose a screenshot or photo of your transfer.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("proof", file);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/payment-proof`, {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      setUploaded(true);
      setFile(null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (uploaded) {
    return (
      <div className="rounded-xl border border-primary/25 bg-paper px-5 py-4" role="status">
        <p className="font-sans text-sm font-medium text-ink">Payment proof received</p>
        <p className="mt-1 font-sans text-sm text-ink-muted">
          Thank you. Your order stays{" "}
          <span className="font-medium text-ink">Payment under review</span> until we confirm the
          transfer in our bank account. Order <span className="font-mono text-ink">{orderId}</span>.
          Track status in{" "}
          <a href="/account" className="text-primary hover:underline">
            My account
          </a>{" "}
          if you are logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-primary/25 bg-paper px-5 py-4">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-ink">Upload payment proof</h3>
        <p className="font-sans text-sm text-ink-muted">
          Attach a screenshot or photo of your bank transfer. Include order{" "}
          <span className="font-mono text-ink">{orderId}</span> in the transfer reference when
          possible.
        </p>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="payment-proof-file"
          className="block font-sans text-sm font-medium text-ink"
        >
          Screenshot or receipt
        </label>
        <input
          id="payment-proof-file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="block w-full cursor-pointer font-sans text-sm text-ink-muted file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:font-medium file:text-on-primary hover:file:bg-primary-hover"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setError(null);
          }}
        />
        {error ? (
          <p className="font-sans text-sm text-ink" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={loading || !file}
          onClick={handleUpload}
        >
          {loading ? "Uploading…" : "Upload proof"}
        </Button>
      </div>
    </div>
  );
}
