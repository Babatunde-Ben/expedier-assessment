import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import {
  primaryNavItems,
  secondaryNavItems,
  cardSubNavItems,
} from "@/constants/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const topLevel = [...primaryNavItems, ...secondaryNavItems].map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified,
    changeFrequency:
      item.href === "/dashboard" ? ("daily" as const) : ("weekly" as const),
    priority: item.href === "/dashboard" ? 1.0 : 0.7,
  }));

  const cardSubRoutes = cardSubNavItems.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...topLevel,
    ...cardSubRoutes,
  ];
}
