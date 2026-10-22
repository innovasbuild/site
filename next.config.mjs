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
      { source: '/en-paralelo', destination: '/servicios', permanent: true },
      { source: '/como-implementamos', destination: '/servicios', permanent: true },
      { source: '/soluciones', destination: '/proyectos', permanent: true },
    ]
  },
  async headers() {
    return [
      // Material comercial por cuenta: accesible por link, fuera de los buscadores.
      { source: '/cuentas/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ]
  },
  async rewrites() {
    return [
      // Las presentaciones estáticas viven en public/cuentas/<slug>/index.html;
      // Next no resuelve el index.html de un directorio sin barra final.
      {
        source: '/cuentas/:slug',
        destination: '/cuentas/:slug/index.html',
      },
    ]
  },
}

export default nextConfig
