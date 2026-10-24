"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "@neondatabase/auth/next";
import { LogOut } from "lucide-react";

const authClient = createAuthClient();

export default function AdminSignOutButton({ className = "", iconOnly = false }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setErrorMessage("");
    setIsPending(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(error.message || "Unable to sign out. Please try again.");
        return;
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign out right now. Please try again.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        title="Sign out"
        aria-label="Sign out"
        className={`${className} inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <LogOut size={16} aria-hidden={!iconOnly} />
        {!iconOnly && (isPending ? "Signing out..." : "Sign out")}
      </button>
      {errorMessage ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
