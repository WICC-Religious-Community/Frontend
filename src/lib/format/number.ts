/** Pure number/currency/phone formatting. */

export function formatCurrency(
  amount: number,
  currency: 'NGN' | 'USD' | 'GBP' = 'NGN'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/** 1_234_567 -> "1.2M" — for view counts, giving totals, attendance. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
}

/** Formats a raw phone string as international, given a default country code. */
export function formatPhone(value: string, countryCode = '234'): string {
  const digits = value.replace(/\D/g, '');
  const national = digits.replace(/^0+/, '');
  return `+${countryCode}${national}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 0.734 -> "73%" */
export function formatPercent(ratio: number, fractionDigits = 0): string {
  return `${(clamp(ratio, 0, 1) * 100).toFixed(fractionDigits)}%`;
}
