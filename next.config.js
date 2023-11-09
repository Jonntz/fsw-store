/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "fsw-store.s3.sa-east-1.amazonaws.com"]
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
