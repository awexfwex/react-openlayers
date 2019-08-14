const path = require('path');
const webpack = require('webpack');

const config = {
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, '..'),
    publicPath: '/examples/build/',
  },
  resolve: {
    extensions: ['.ts', '.webpack.js', '.js', '.jsx', '.tsx', '.json', '.css', '.html'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'react-openlayers': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,

            presets: [
                ["@babel/preset-env", {
                    targets: {
                        edge: "12",
                        ie: "11",
                        chrome: "33",
                        safari: "10",
                        samsung: "9"
                    },
                    modules: false,
                    useBuiltIns: false,
                }],
                "@babel/preset-react",
                "@babel/preset-typescript"
            ],
            plugins: [
              'react-hot-loader/babel',
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread"
            ],
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {test: /\.html/, use: 'html-loader'},
    ] 
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
