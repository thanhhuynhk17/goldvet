// next.config.mjs   ← Save as .mjs (recommended) or keep as .js if you prefer

import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',                    // Required for tiny Docker images
  reactStrictMode: true,
  experimental: {
    // Helps with large CSS bundles in Payload admin
    optimizeCss: true,
  },

  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)
        return {
          protocol: url.protocol.replace(':', ''),
          hostname: url.hostname,
          port: url.port || '',
        }
      }),
    ],
  },

  redirects,

  // ─────────────────────────────────────────────────────────────
  // 1. Fix "Unclosed block" in Docker (Alpine) – removes broken CssMinimizerPlugin
  // 2. No more invalid swcMinify warning
  // ─────────────────────────────────────────────────────────────
  webpack(config, { isServer }) {
    // Only remove CSS minifier from client bundle (server bundle doesn't use it)
    if (!isServer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
      )
    }

    // Your existing extension alias (kept exactly as you had it)
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config
  },
}

export default withPayload(nextConfig)