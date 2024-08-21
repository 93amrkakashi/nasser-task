/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'st-takla.org',
                pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'www.transparentpng.com',
              pathname: '**',
          },
        ],
    }
};

export default nextConfig;
