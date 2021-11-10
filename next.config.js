/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:1337"
        : "https://strapi-opei.onrender.com",
  },
  images: {
    domains: ["localhost", "strapi-opei.onrender.com"],
  },
};
