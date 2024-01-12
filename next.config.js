module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eagler-upload.s3.eu-central-1.amazonaws.com',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        pathname: '/*',
      }
    ],
  },
}