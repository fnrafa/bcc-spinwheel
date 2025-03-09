import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn2.suno.ai",
            },
            {
                protocol: "https",
                hostname: "assets.meshy.ai",
            },
            {
                protocol: "https",
                hostname: "api.musicapi.ai",
            },
            {
                protocol: "https",
                hostname: "bnb3d.tech",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
};

export default nextConfig;
