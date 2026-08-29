import React, { useState } from "react";
import { Mail, Check, Copy } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  variant?: "button" | "pill" | "icon";
}

export default function CopyEmailButton({
  email,
  variant = "button",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  if (variant === "pill") {
    return (
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-all cursor-pointer group"
        title="Click to copy email address"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied to clipboard!</span>
          </>
        ) : (
          <>
            <Mail className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>{email}</span>
            <Copy className="w-3 h-3 text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white shadow-sm hover:border-white/30"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">Email Copied!</span>
        </>
      ) : (
        <>
          <Mail className="w-4 h-4 text-neutral-400" />
          <span>Copy Email ({email})</span>
        </>
      )}
    </button>
  );
}
