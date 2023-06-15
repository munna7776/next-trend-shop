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
    }
}

module.exports = nextConfig
