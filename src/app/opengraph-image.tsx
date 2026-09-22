import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const iconBase64 = readFileSync(join(process.cwd(), 'public/brand/icon-512.png')).toString('base64');

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
          background: '#0a0a0b',
          color: '#f5f5f4',
        }}
      >
        {/* next/og requires a plain <img>, not next/image */}
        <img
          src={`data:image/png;base64,${iconBase64}`}
          alt=""
          width={88}
          height={88}
          style={{ marginBottom: 28 }}
        />
        <div style={{ fontSize: 88, fontWeight: 400, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 20, color: '#5b82f2', maxWidth: 820, textAlign: 'center', padding: '0 48px' }}>
          {SITE.description}
        </div>
      </div>
    ),
    size
  );
}
