import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        letterSpacing: '-0.02em',
                    }}
                >
                    D
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
