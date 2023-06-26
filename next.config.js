/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.shopify.com',
                protocol: 'https',
                pathname: '**',
                port: ''
            }
        ]
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
