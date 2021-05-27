/* eslint-env node */
const path = require('path');

module.exports = require('./webpack.base')({
  devServer: {
    contentBase: path.resolve('public/'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 8181,
    publicPath: 'http://dev.orderstatus.dteenergy.com/build',
  },

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  mode: 'development',

  output: {
    filename: 'wismo-ui.js',
    publicPath: '/build/',
  },

  performance: {
    hints: false,
  },

  plugins: [],
  // plugins: [new webpack.HotModuleReplacementPlugin()],
});
