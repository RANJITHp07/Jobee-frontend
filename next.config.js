/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  api: {
    path: '/src/api',
  },
  images: {
    domains: ['jobeeapplication-bucket.s3.ap-south-1.amazonaws.com'],
  },
  };
