// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = merge(common('production'), {
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
})
