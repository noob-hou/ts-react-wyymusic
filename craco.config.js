const path = require('path')

const resolve = (pathName) => path.resolve(__dirname, pathName)
const cracoLess = require('craco-less')
module.exports = {
  // css:{
  //   loaderOptions:{
  //     less:{
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  plugins: [
    {
      plugin: cracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      "@": resolve('src')
    }
  }

}