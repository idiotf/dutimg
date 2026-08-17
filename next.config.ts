import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(','),
}

export default nextConfig
