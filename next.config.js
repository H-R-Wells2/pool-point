/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    headers: {
        'Overscroll-Behavior': 'none',
    },
    experimental: {
        esmExternals: "loose",
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
}

module.exports = nextConfig
