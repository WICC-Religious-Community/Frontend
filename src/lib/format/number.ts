const DEFAULT_LOCALE = "en-US";

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, options).format(value);
}

/** e.g. 12400 -> "12.4K". */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency }).format(value);
}

export function formatPercent(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "percent",
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}
