module.exports = {
  apps: [
    {
      name: 'mintall-nft-cert-api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
        ENV_FROM: 'system',
        PORT: '3000',
        AWS_REGION: 'ap-southeast-1',
        AWS_SECRET_NAME: '/dev/mintall-nft-cert-api',
      },
      env_production: {
        NODE_ENV: 'production',
        ENV_FROM: 'aws',
        PORT: '3000',
        AWS_REGION: 'ap-southeast-1',
        AWS_SECRET_NAME: '/prod/mintall-nft-cert-api',
      },
    },
  ],
};
