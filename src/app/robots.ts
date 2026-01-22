import { baseUrl } from "@/helper";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Internal / framework
          "/api",
          "/_next",

          // Protected routes
          "/dashboard",
          "/dashboard/",
          "/account",
          "/account/",
          "/transaction",
          "/transaction/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
