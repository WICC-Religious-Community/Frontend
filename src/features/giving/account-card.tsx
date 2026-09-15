'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { GivingAccount } from '@/domain/giving/model';

export function AccountCard({ account }: { account: GivingAccount }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — the number is still visible to copy manually
    }
  };

  return (
    <div className="border-border rounded-lg border p-6">
      <p className="text-subtle text-label font-semibold uppercase tracking-wide">{account.label}</p>
      <p className="font-display mt-3 text-heading-md font-semibold tabular-nums text-ink">
        {account.accountNumber}
      </p>
      <p className="text-muted mt-1 text-body-sm">
        {account.bankName} · {account.accountName} · {account.currency}
      </p>
      <button
        type="button"
        onClick={copy}
        className="text-primary-dark mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy account number'}
      </button>
    </div>
  );
}
