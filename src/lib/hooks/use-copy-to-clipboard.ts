"use client";

import { useCallback, useState } from "react";

/** Copies text to the clipboard and reports success — "Copied!" buttons on share links, emails, etc. */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetAfterMs);
        return true;
      } catch {
        setIsCopied(false);
        return false;
      }
    },
    [resetAfterMs]
  );

  return { isCopied, copy };
}
