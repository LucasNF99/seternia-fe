/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'aquamarine-elaborate-cuckoo-625.mypinata.cloud',
      }
    ]
  },
};

export default nextConfig;
