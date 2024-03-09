/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    })
}

module.exports = nextConfig
