import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.10"],

  images: {
    formats: ["image/avif", "image/webp"],
  },

  compress: true,

  poweredByHeader: false,

  async redirects() {
    return [
      // =========================
      // OLD PROJECT URLS
      // =========================
      {
        source: "/wilder",
        destination: "/projects/wilder",
        permanent: true,
      },
      {
        source: "/lords-of-franklin-county",
        destination: "/projects/lords-of-franklin-county",
        permanent: true,
      },
      {
        source: "/nothing-changes",
        destination: "/projects/nothing-changes",
        permanent: true,
      },
      {
        source: "/nowhere-kings",
        destination: "/projects/nowhere-kings",
        permanent: true,
      },
      {
        source: "/my-life-before-me",
        destination: "/projects/my-life-before-me",
        permanent: true,
      },
      {
        source: "/sunsets-in-memphis",
        destination: "/projects/sunsets-in-memphis",
        permanent: true,
      },
      {
        source: "/the-last-stop",
        destination: "/projects/the-last-stop",
        permanent: true,
      },
      {
        source: "/the-white-raven",
        destination: "/projects/the-white-raven",
        permanent: true,
      },
      {
        source: "/pines",
        destination: "/projects/pines",
        permanent: true,
      },
      {
        source: "/ballad-of-colibri",
        destination: "/projects/ballad-of-colibri",
        permanent: true,
      },
      {
        source: "/family-tradition",
        destination: "/projects/family-tradition",
        permanent: true,
      },
      {
        source: "/gas-boys",
        destination: "/projects/gas-boys",
        permanent: true,
      },

      // =========================
      // OLD WP PAGES
      // =========================
      {
        source: "/contact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/accolades",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/shorts",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/",
        permanent: true,
      },

      // =========================
      // OLD READ-ME / BLOG URLS
      // =========================
      {
        source: "/family-tradition-read-me",
        destination: "/projects/family-tradition",
        permanent: true,
      },
      {
        source: "/the-last-stop-read-me",
        destination: "/projects/the-last-stop",
        permanent: true,
      },
      {
        source: "/whats-buried-beneath-the-pines",
        destination: "/projects/pines",
        permanent: true,
      },
      {
        source: "/whats-buried-read-me",
        destination: "/projects/pines",
        permanent: true,
      },
      {
        source: "/who-stole-the-head-of-bobbi-dupree",
        destination: "/projects/nothing-changes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;