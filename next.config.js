module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        pathname: '/*',
      },
      {
        protocol: 'http',
        hostname: 'eagler-pictures-target-bucket.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/*',
      }
    ],
  },
}