import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'WSU Intramural Scoreboard',
        short_name: 'WSU Scoreboard',
        description: 'Real-time scoreboard for WSU Intramural Sports',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#981e32',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
