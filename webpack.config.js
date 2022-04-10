const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: "development",
  plugins: [
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ],

  entry: {
    customize: './src/app.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.json','.ts','.tsx' ,'.jsx'],
  },

  module: {

    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist'),
            },
          },
          'css-loader',
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader', // https://webpack.js.org/loaders/babel-loader/#root
          options: {
            presets: [
              ['@babel/preset-react', {
                runtime: 'automatic',
              }],
            ],

          },
        },
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
              // sync + async chunks
              name: 'vendor',
              chunks: 'all',
              // import file path containing node_modules
              test: /node_modules/
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
      }
  },
  minimizer: [
      new ForkTsCheckerWebpackPlugin(),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  
};
