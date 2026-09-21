import { ImageResponse } from 'next/og';
import { SITE } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F1A',
          color: '#F4EFE4',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em' }}>{SITE.name}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: '#B98A2E', maxWidth: 820, textAlign: 'center', padding: '0 48px' }}>
          {SITE.description}
        </div>
      </div>
    ),
    size
  );
}
