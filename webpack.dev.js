const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  output: {
    publicPath: '/',
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader!awesome-typescript-loader',
      },
      {
        test: /\.jsx|.js?$/,
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
        test: /.less$/,
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
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          // 将第三方模块提取出来
          test: /node_modules/,
          chunks: 'initial',
          test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
          name: 'vendor',
          priority: 10, // 优先
          enforce: true,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    publicPath: '/',
    port: 8888,
    watchContentBase: true,
    watchOptions: {
      poll: true,
    },
    proxy: {
      '/api/jedishareservice/': {
        target: 'http://share.dev.qiaofangyun.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/jedishareservice': '/api/jedishareservice',
        },
      },
      '/api/mbff/': {
        target: 'http://nm.dev.qiaofangyun.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mbff': '/api/mbff',
        },
      },
    },
    overlay: true,
    historyApiFallback: {
      index: '/index.html',
    },
  },
}
