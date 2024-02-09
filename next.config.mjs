/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "static.report.az"
            }
        ]
    }
};

export default nextConfig;