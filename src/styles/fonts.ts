import { Fraunces, Inter } from 'next/font/google';

/**
 * The two typefaces for the whole site — a warm display serif for headings,
 * a grotesk sans for everything else. Wired to `--font-display` / `--font-body`
 * (consumed by `globals.css`'s `@theme` block). Swap fonts here only.
 */
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display-face',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
