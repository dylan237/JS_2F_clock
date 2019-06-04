const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // entry: './src/index.js',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    // publicPath: './',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].shared.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
		alias: {
      '@': path.resolve(__dirname, 'src/'),
      '~': path.resolve(__dirname, 'node_modules/'),
		}
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              "@babel/plugin-syntax-dynamic-import",
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }]
            ]
          }
        }
      },
      {
        test: /\.html$/ ,
        // test: /\.(html|pug)$/,
        use: [
          {
            loader: 'html-withimg-loader',
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['html-loader','pug-html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './src/assets/static/fonts', to: 'fonts' },
    ], {
      ignore: [],
      copyUnmodified: true
    }),
    new HtmlWebpackPlugin({
      title: '首頁',
      excludeAssets: [/style.*.js/],
      filename: 'index.html', // 輸出時的檔名
      template: './src/pages/index.html' // 來源檔
      // 若有其他頁，再新增一樣的new HtmlWebpackPlugin()格式即可
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}