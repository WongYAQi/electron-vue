const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
function resolve (dir) {
  let t = path.join(__dirname, '..', dir)
  return t
}
module.exports = {
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    port: '9972'
  },
  resolve: {
    extensions: ['vue', 'js', 'json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ]
};
