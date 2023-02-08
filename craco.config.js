const path = require('path');

const resolve = (pathName) => path.resolve(__dirname, pathName);
const cracoLess = require('craco-less');
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
      '@': resolve('src')
    }
  },
  devServer: {
    // 配置webpack-dev-server， 在本地启动一个服务器运行
    host: 'localhost', // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 80, // 端口
    open: true, // 自动打开页面
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://codercba.com:9002',
        changeOrigin: true
      }
    }
  }
};
