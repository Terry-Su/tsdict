import * as PATH from 'path'
const { resolve } = PATH
const webpack = require( 'webpack' )
const CopyWebpackPlugin = require( "copy-webpack-plugin" )
import { __DEV__ } from "./script/global"
import { OUTPUT_FILE_NAME, ENTRY, OUTPUT, ENTRY_INDEX_HTML, OUTPUT_INDEX_HTML } from './script/constants';




const webpackClientConfig = {
  mode  : __DEV__ ? 'development' : 'production',
  entry : {
    [ OUTPUT_FILE_NAME ]: [ 
      ENTRY,
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`,   
    ]
  },
  output: {
    path      : OUTPUT,
    filename  : '[name]',
    publicPath: '/'
  },
  devtool: __DEV__ ? 'source-map' : false,
  module : {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use : {
          loader : 'ts-loader',
        },
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new CopyWebpackPlugin( [
      {
        from: ENTRY_INDEX_HTML,
        to  : OUTPUT_INDEX_HTML
      }
    ],
   ),
  ].concat(
    __DEV__ ?
     [
      new webpack.HotModuleReplacementPlugin()
    ]:
    []    
  )
}


export default webpackClientConfig