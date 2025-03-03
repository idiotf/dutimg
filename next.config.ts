import type { NextConfig } from 'next'

export default {
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '4gb',
    },
  },
} satisfies NextConfig
