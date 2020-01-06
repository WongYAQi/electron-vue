const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
function resolve (dir) {
  let t = path.join(__dirname, '..', dir)
  return t
}
module.exports = {
  devServer: {
    hot: true,
    port: '9972',
    historyApiFallback: {
      index: '/index.html'
    }
    // proxy: {
    //   '/': 'http://localhost:3001'
    // }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
