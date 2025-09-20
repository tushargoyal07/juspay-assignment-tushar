import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Dashboard - Figma UI Redux',
        short_name: 'Dashboard',
        description: 'Modern dashboard built with atomic design principles',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#667eea',
        icons: [
            {
                src: '/icon',
                sizes: '32x32',
                type: 'image/png',
            },
        ],
    }
}
