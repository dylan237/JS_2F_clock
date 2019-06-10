const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    // hot: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // publicPath: './images',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.css$/,  
        use: [
          // 'style-loader', 直接插入style標籤，不編譯成css
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: '../'
            }
          },
          {loader: 'css-loader'},
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          // 'style-loader', 直接插入style標籤，不編譯成css
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css',
    })
  ]
})