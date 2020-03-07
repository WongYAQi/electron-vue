const path = require('path')
const webpack = require('webpack')
const Base = require('./webpack.config.base.js')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = merge(Base, {
  output: {
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
