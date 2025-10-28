let userConfig = undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed 'output: export' to support API routes for media gallery
  // AWS Amplify supports SSR mode with automatic Lambda deployment
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Expose environment variables to API routes (Lambda functions) in Amplify
  env: {
    AWS_REGION: process.env.AWS_REGION,
    MEDIA_BUCKET_NAME: process.env.MEDIA_BUCKET_NAME,
    REKOGNITION_COLLECTION_ID: process.env.REKOGNITION_COLLECTION_ID,
    AWS_SECRET_NAME: process.env.AWS_SECRET_NAME,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
