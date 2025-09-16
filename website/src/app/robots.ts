import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account"], // private user page
      },
    ],
    sitemap: "https://agilohub.com/sitemap.xml",
  };
}
