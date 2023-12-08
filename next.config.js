/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.rawpixel.com",
                port: "",
                pathname:
                    "/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
            },
            {hostname: "lh3.googleusercontent.com"},
        ],
        
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    },
};

module.exports = nextConfig;
