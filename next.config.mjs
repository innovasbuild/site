/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        // Short link de la presentación institucional.
        // Si cambia el deck, se actualiza solo esta URL.
        source: '/empresa',
        destination:
          'https://docs.google.com/presentation/d/e/2PACX-1vRmPmero7rjtTi3egDUQeircg4BnfMXTTq4H6Z7iIynnV4ejUqVLLNkpKlEbPbgQavmJXIQhNGnOr2F/pub?start=true&loop=false&delayms=3000',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
