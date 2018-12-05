import * as PATH from "path"
const { resolve } = PATH
const webpack = require( "webpack" )
const CopyWebpackPlugin = require( "copy-webpack-plugin" )
const WriteFilePlugin = require( "write-file-webpack-plugin" )
import { __DEV__ } from "./script/global"
import {
  OUTPUT_FILE_NAME,
  ENTRY,
  OUTPUT,
  ENTRY_INDEX_HTML,
  OUTPUT_INDEX_HTML,
  ENTRY_INDEX_CACHE,
  OUTPUT_INDEX_CACHE,
  ENTRY_MANIFEST_CACHE,
  OUTPUT_MANIFEST_CACHE,
  ENTRY_SW,
  OUTPUT_SW
} from "./script/constants"

const webpackClientConfig = {
  mode : __DEV__ ? "development" : "production",
  entry: {
    [ OUTPUT_FILE_NAME ]: [
      ENTRY,
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`
    ]
  },
  output: {
    path      : OUTPUT,
    filename  : "[name]",
    publicPath: "/"
  },
  devtool: __DEV__ ? "source-map" : false,
  module : {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use : {
          loader: "ts-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use : [ "style-loader", "css-loader" ]
      },
      {
        test: /\.scss$/,
        use : [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  plugins: [
    new CopyWebpackPlugin( [
      {
        from: ENTRY_INDEX_HTML,
        to  : OUTPUT_INDEX_HTML
      },
      {
        from: ENTRY_INDEX_CACHE,
        to  : OUTPUT_INDEX_CACHE
      },
      {
        from: ENTRY_MANIFEST_CACHE,
        to  : OUTPUT_MANIFEST_CACHE
      },
      {
        from: ENTRY_SW,
        to  : OUTPUT_SW
      },
    ] ),
  ].concat( __DEV__ ? [ 
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ] : [] )
}

export default webpackClientConfig
