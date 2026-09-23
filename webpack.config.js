const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js',
      clean: true,
    },
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
      hot: true,
      open: true,
      watchFiles: ['src/**/*'],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        favicon: './src/assets/gadget-hub.png',
      }),
      ...(isDev
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: 'css/styles.css',
            }),
          ]),
    ],
    resolve: {
      extensions: ['.js'],
    },
  };
};