/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
    );
    return config;
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  images: {
    // domains: [
    //   'images.unsplash.com',
    //   'ownkey.fra1.cdn.digitaloceanspaces.com',
    //   'avatars.dicebear.com',
    //   'a1.digitaloceanspaces.com',
    //   'ownkey.fra1.digitaloceanspaces.com',
    //   'ownkey-bucket.fra1.digitaloceanspaces.com',
    //   'api.dicebear.com',
    //   'mosgqwgurpgyzzsdixks.supabase.co',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ownkey-bucket.fra1.cdn.digitaloceanspaces.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'mosgqwgurpgyzzsdixks.supabase.co',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
