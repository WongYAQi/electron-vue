const base = require('./webpack.config.base')
const dev = require('./webpack.config.dev')

const merge = require('webpack-merge')

module.exports = mode => {
  return merge(base, dev, { mode })
}