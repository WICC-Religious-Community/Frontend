# Sample content

Everything in `src/content/sample/` is **placeholder content for design review only** —
not real information about WICC. It exists so every page can be seen fully laid out
before a real backend/CMS is connected.

- Every fact that could be mistaken for real (address, phone, email, service times,
  doctrine) uses an obviously-fake placeholder (`555` numbers, `example.com`,
  generic non-denominational statements).
- No photography is included — every image slot is left empty so the app's own
  placeholder treatment (a soft gradient) renders instead of a hotlinked stock photo.
- This only ever renders when `NEXT_PUBLIC_API_URL` is unset (see `isApiConfigured`
  in `src/config/env.ts`). The moment a real API is configured, none of this is
  reachable — every `domain/*/server.ts` fetcher tries the real API first, always.
- A visible "Preview content" banner (`src/components/layout/preview-banner.tsx`)
  renders on every page while this is active, so it's never mistaken for the live site.

**To go live:** point `NEXT_PUBLIC_API_URL` at a real backend implementing
`src/lib/api/openapi.yaml`. This directory then becomes dead code you can delete,
or keep as a design reference.
