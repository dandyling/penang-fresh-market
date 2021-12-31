/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    SERVER:
      process.env.NODE_ENV === "development"
        ? "http://localhost:1337"
        : "https://strapi-penang.herokuapp.com",
    IMAGE_HOST:
      process.env.NODE_ENV === "development" ? "http://localhost:1337" : "",
  },
  images: {
    domains: ["localhost", "strapi-penang.herokuapp.com", "res.cloudinary.com"],
  },
};
