import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'BACTERIÓDICO'
  const category = searchParams.get('category')
  const date = searchParams.get('date')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span>🧫</span>
            <span>BACTERIÓDICO</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flex: 1,
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {category && (
            <div
              style={{
                fontSize: 28,
                color: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '8px 20px',
                  borderRadius: '8px',
                }}
              >
                {category}
              </span>
              {date && <span>{date}</span>}
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.8)',
            display: 'flex',
          }}
        >
          Te acercamos al mundo de los microorganismos
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
