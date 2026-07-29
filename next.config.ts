import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPages ? "/prompt-rich-website" : "",
  assetPrefix: githubPages ? "/prompt-rich-website" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
