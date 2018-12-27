const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const pkg = require('./package.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts|tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader!awesome-typescript-loader',
      },
      {
        test: /\.jsx|js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: [
                    'iOS >= 7',
                    'Android >= 4.1',
                    'last 10 Chrome versions',
                    'last 10 Firefox versions',
                    'Safari >= 6',
                    'ie > 8',
                  ],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                '@brand-primary': '#FF9000',
                '@color-text-base': '#FF9000',
                '@primary-button-fill': '#FF9000',
                '@primary-button-fill-tap': '#FF9000',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129', //limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less', '.sass'],
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
