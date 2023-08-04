/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: '/api/auth/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: '/api/auth/:path*',
//       },
//     ];
//   },
// };

