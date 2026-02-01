/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Configure image optimization
  images: {
    // Define allowed quality values
    qualities: [75, 90, 95],
    // Disable automatic optimization for problematic images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // For Next.js 16, quality is set per image in the component
    // Format selection is automatic based on browser support
  },
};

export default nextConfig;
