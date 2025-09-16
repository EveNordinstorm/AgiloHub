import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://agilohub.com", lastModified: new Date() },
    { url: "https://agilohub.com/about", lastModified: new Date() },
    { url: "https://agilohub.com/store", lastModified: new Date() },
    { url: "https://agilohub.com/tiers", lastModified: new Date() },
  ];
}
