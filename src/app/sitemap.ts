import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://grainsoftime.com";

  const routes = [
    "",
    "/about",
    "/members",
    "/events",
    "/history",
    "/repertoire",
    "/gallery",
    "/music",
    "/merch",
    "/book",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
