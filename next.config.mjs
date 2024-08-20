/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'st-takla.org',
                pathname: '**',
            },
        ],
    }
};

export default nextConfig;
