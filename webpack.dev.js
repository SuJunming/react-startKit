const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js', '.json'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new UglifyJsPlugin({ sourceMap: true }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    publicPath: '/',
    port: 8888,
    watchContentBase: true,
    watchOptions: {
      poll: true,
    },
    historyApiFallback: true,
    historyApiFallback: {
      index: '/index.html',
    },
    proxy: {
      '/api/**': {
        target: 'http://0.0.0.0:3000',
        changeOrigin: true,
      },
    },
  },
}
