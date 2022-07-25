const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const feed = require("./plugins/feed");
const sitemap = require("./plugins/sitemap");

module.exports = withPlugins([[feed], [sitemap]], {
  env: {
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    WORDPRESS_MENU_LOCATION_NAVIGATION:
      process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || "PRIMARY",
    WORDPRESS_PLUGIN_SEO: parseEnvValue(
      process.env.WORDPRESS_PLUGIN_SEO,
      false
    ),
    POSTS_PER_PAGE: process.env.POSTS_PER_PAGE,
    HOME_PAGE: process.env.HOME_PAGE,

    // The image directory for open graph images will be saved at the location above
    // with `public` prepended. By default, images will be saved at /public/images/og
    // and available at /images/og. If changing, make sure to update the .gitignore

    OG_IMAGE_DIRECTORY: "/images/og",
    trailingSlash: true,
  },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  nextConfig,
});

function parseEnvValue(value, defaultValue) {
  if (typeof value === "undefined") return defaultValue;
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return value;
}
