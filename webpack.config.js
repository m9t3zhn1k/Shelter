const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isDevelopment = options.mode === 'development';
  return {
    entry: {
      main: path.resolve(__dirname, 'src/pages/main/main.js'),
      pets: path.resolve(__dirname, 'src/pages/pets/pets.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      assetModuleFilename: 'images/[hash][ext]'
    },
    devtool: 'source-map',
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/pages/main/main.html'),
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/pages/pets/pets.html'),
        filename: 'pets.html',
        chunks: ['pets'],
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
            {
              from: './src/assets/images',
              to: 'images'
            }
        ]
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(ico|jpg|png|svg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
      ],
    },
    devServer: {
      port: 8888,
      static: {
        directory: path.join(__dirname, './src/pages/main/index.html'),
      },
    },
  }
}