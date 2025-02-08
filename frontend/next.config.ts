import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn1-production-images-kly.akamaized.net",
      "encrypted-tbn0.gstatic.com",
      "alukhuwah.com",
      "i.ytimg.com",
      "images.tokopedia.net",
      "filebroker-cdn.lazada.co.id",
    ],
  },
};

export default nextConfig;
