"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ENQUIRY_STATUSES,
  ENQUIRY_STATUS_LABELS,
} from "@/lib/enquiry-config";

export default function EnquiryStatusSelect({ id, name, initialStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleChange(event) {
    const nextStatus = event.target.value;
    const previousStatus = status;
    setStatus(nextStatus);
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update this enquiry.");
      }

      router.refresh();
    } catch (updateError) {
      setStatus(previousStatus);
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update this enquiry.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <select
        value={status}
        onChange={handleChange}
        disabled={saving}
        aria-label={`Status for ${name}`}
        className="rounded-md border border-[#dedbd4] bg-white px-2 py-1.5 text-xs text-[#504b44] outline-none focus:border-[#c2410c] disabled:opacity-60"
      >
        {ENQUIRY_STATUSES.map((option) => (
          <option key={option} value={option}>
            {ENQUIRY_STATUS_LABELS[option]}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="mt-1 max-w-36 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
