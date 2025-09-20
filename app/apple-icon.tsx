import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
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
                    borderRadius: 20,
                }}
            >
                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        letterSpacing: '-0.02em',
                    }}
                >
                    D
                </div>
                <div
                    style={{
                        fontSize: 18,
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginTop: 8,
                        letterSpacing: '0.1em',
                    }}
                >
                    DASHBOARD
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
