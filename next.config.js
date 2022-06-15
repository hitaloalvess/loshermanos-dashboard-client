/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
        BASE_URL_IMAGE_LOCAL: process.env.BASE_URL_IMAGE_LOCAL
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig