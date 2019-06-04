const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].shared.js',
    path: path.resolve(__dirname, 'dist')
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
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
            {loader: 'css-loader'},
            {
              loader: "postcss-loader",
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                  }),
                ]
              }
            },
            {loader: 'sass-loader'},
        ]
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },  
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css',
    })
  ]
})