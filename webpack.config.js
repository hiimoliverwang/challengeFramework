/**
 * Created by oliverwang on 4/18/16.
 */
module.exports = {
  entry: ["babel-polyfill","./index.js"],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  es6: true,
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};