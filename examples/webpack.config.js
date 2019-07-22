/**
 * This config is to build app/app.js to show examples to github users
 */
var path = require('path');
const webpack = require('webpack');

const config = {
  mode: process.env.NODE_ENV || "development",
  entry: './examples/index.tsx',
  output: {
    path: `${__dirname}/build/`,
    publicPath: '/build/',
    filename: 'app.js'
  },
  devtool: 'source-map',
  devServer: {
    // host: '0.0.0.0',
    disableHostCheck: true,
  },
  resolve: {
    extensions: ['.ts', '.webpack.js', '.js', '.tsx', '.json', '.css', '.html'],
    alias: {
      'react-openlayers': path.join(__dirname, '..')
    }
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {test: /\.html/, use: 'html-loader'},
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ] 
  },
  plugins: []
};

module.exports = config;
