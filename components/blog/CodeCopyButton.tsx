"use client";

import { useState } from "react";
import Tooltip from "@/components/Tooltip";

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Tooltip content={copied ? "copied!" : "copy"} position="top">
      <button
        onClick={handleCopy}
        className="copy-btn"
        type="button"
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        style={{
          color: copied ? "var(--accent)" : undefined,
          borderColor: copied ? "var(--accent)" : undefined,
        }}
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </Tooltip>
  );
}
