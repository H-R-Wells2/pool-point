/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        esmExternals: "loose",
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
}

module.exports = nextConfig
