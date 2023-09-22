/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        esmExternals: "loose",
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    })
}

module.exports = nextConfig
