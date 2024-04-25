const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
});

module.exports = {
  // compiler: {
  //   removeConsole: true,
  // },
  swcMinify: true,
  generateEtags: false,
  compress: true,
  images: {
    domains: process.env.IMAGE_DOMAINS.split(", "),
  },
  env: {
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
    SPOTIFY_USER: process.env.SPOTIFY_USER,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  },
};
