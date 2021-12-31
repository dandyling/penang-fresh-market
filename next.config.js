/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:1337"
        : "https://strapi-penang.herokuapp.com",
  },
  images: {
    domains: ["localhost", "https://strapi-penang.herokuapp.com"],
  },
};
