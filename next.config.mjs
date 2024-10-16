/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com"
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com"
            }
        ],
        dangerouslyAllowSVG: true
    }
};

export default nextConfig;


