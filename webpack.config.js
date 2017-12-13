var path = require('path');
const webpack = require('webpack');

function header() {
  var gitDesc = process.env.GIT_DESC;
  var text = 'annocrat ' + gitDesc + ' built ' + new Date();
  return '// ' + text + '\n\n';
}
process.traceDeprecation = true;

module.exports = {
  entry: {
    annocrat: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'annocrat.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'es2017']
        }
      }]
    }]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: header(),
      test: /\.js$/,
      raw: true,
      entryOnly: true
    })
  ]
};
