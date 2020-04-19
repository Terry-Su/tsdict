import CleanWebpackPlugin from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import PATH from 'path'

import {
  ENTRY, ENTRY_INDEX_CACHE, ENTRY_INDEX_HTML, ENTRY_MANIFEST_CACHE, ENTRY_OFFLINE_HTML, ENTRY_SW,
  OUTPUT, OUTPUT_FILE_NAME, OUTPUT_INDEX_CACHE, OUTPUT_INDEX_HTML, OUTPUT_MANIFEST_CACHE,
  OUTPUT_OFFLINE_HTML, OUTPUT_SW, SHARED, SRC
} from './script/constants'
import { __DEV__ } from './script/global'

const { resolve } = PATH
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpackClientConfig = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    [OUTPUT_FILE_NAME]: [
      ENTRY,
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ]
  },
  output: {
    path: OUTPUT,
    filename: '[name]',
    publicPath: '/'
  },
  devtool: __DEV__ ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': SRC,
      '@shared': SHARED
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: ENTRY_INDEX_HTML,
        to: OUTPUT_INDEX_HTML
      },
      // {
      //   from: ENTRY_OFFLINE_HTML,
      //   to: OUTPUT_OFFLINE_HTML
      // },
      // {
      //   from: ENTRY_INDEX_CACHE,
      //   to  : OUTPUT_INDEX_CACHE,
      // },
      {
        from: ENTRY_MANIFEST_CACHE,
        to: OUTPUT_MANIFEST_CACHE
      }
    ]),
    new ForkTsCheckerWebpackPlugin()
  ].concat(__DEV__ ? [
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new CleanWebpackPlugin()
  ])
}

export default webpackClientConfig
