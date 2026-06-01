import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://krisshuman.com";

  const routes = [
    {
      path: "",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/work",
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // PROJECTS
    {
      path: "/projects/ballad-of-colibri",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/dupree",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/family-tradition",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/gas-boys",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/lords-of-franklin-county",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/my-life-before-me",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/nothing-changes",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/nowhere-kings",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/pines",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/sunsets-in-memphis",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/the-last-stop",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/the-white-raven",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/projects/wilder",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ] as const;

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}