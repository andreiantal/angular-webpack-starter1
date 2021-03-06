var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  context : path.join(__dirname, 'app'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      RUN_TEST: process.env.NODE_ENV === 'test'
    }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /(\.scss)|(\.css)$/,
        loader: ExtractTextPlugin.extract('style','!css!autoprefixer?browsers=last 2 version!sass')
      }
    ]
  },
  devServer: {
    contentBase: 'app',
    noInfo: false,
    inline: true
  }
};

if (process.env.NODE_ENV == 'production') {
  config.output.path = path.join(__dirname, 'dist');
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true
    },
    output: {
      comments: false
    }
  }));
}

module.exports = config;
