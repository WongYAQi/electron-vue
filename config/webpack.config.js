const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
