const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new Dotenv({ path: '../../.env' }),
    new ForkTsCheckerWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],

  entry: {
    customize: './src/app.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      crypto: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'file-loader',
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
/*       {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,

        use: {
          loader: 'babel-loader', // https://webpack.js.org/loaders/babel-loader/#root
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      }, */
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          //experimentalWatchApi: true,
          //configFile: './tsconfig.build.json',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      minSize: 20000,

      cacheGroups: {
        default: false,
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 20,
          reuseExistingChunk: true,
          enforce: true,
        },
        assets: {
          chunks: 'all',
          name: 'assets',
          test: /[\\/]assets[\\/]/,
          priority: -30,
        },
        mui: {
          chunks: 'all',
          name: 'vendor-mui',

          test: /[\\/]@mui[\\/]/,
          priority: 0,
        },
        vendors: {
          // sync + async chunks
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          // import file path containing node_modules
          test: /node_modules/,
        },
      },
    },
    minimizer: [
      new ForkTsCheckerWebpackPlugin(),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
