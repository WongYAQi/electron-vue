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
    'babel-polyfill',
    './src/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist.vue'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@root': resolve('/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@vue/babel-preset-jsx']
          }
        }
      },
      {
        test: /\.(svg|png)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'file-loader'
        }
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
}
