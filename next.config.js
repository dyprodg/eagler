module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "eagler-pictures-target-bucket.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "d2eppnsta31d93.cloudfront.net",
        port: "",
        pathname: "/*",
      },

    ],
  },
  output: "standalone",
};
