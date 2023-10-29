// @ts-check
import withPlaiceholder from "@plaiceholder/next";

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

export default withPlaiceholder(nextConfig)
