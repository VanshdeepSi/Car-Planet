/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — replace "your-project-ref" once you have a project
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
