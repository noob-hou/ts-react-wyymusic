const path = require('path')

const resolve = (pathName) => path.resolve(__dirname, pathName)
const cracoLess = require('craco-less')
module.exports = {
  plugins: [
    { plugin: cracoLess }
  ],
  webpack: {
    alias: {
      "@": resolve('src')
    }
  }

}