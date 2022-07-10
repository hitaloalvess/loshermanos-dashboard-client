/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
        BASE_URL_IMAGE_LOCAL: process.env.BASE_URL_IMAGE_LOCAL
    },
    pageExtensions: ['tsx'],
    compiler: {
        styledComponents: true,
    },

    images: {
        domains: ['localhost', 'api-loshermanos.s3.sa-east-1.amazonaws.com']
    },


}

module.exports = withPlugins([
    [withImages]
], nextConfig)