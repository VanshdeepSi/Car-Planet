import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#131313',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e2e2e2',
          borderRadius: '4px',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ color: '#ffb4a8' }}>C</span>P
      </div>
    ),
    {
      ...size,
    }
  )
}
