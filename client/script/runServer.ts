
import webpackConfig from '../webpack.config'
import { PORT } from '../config'
import { __DEV__ } from './global'
import { OUTPUT_INDEX_HTML, OUTPUT, TSDICT_CDN_STORE } from './constants'
const express = require('express')
const PATH = require('path')
const webpack = require('webpack')

export default function () {
  const compiler = webpack(webpackConfig)

  if (!__DEV__) {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        return
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true
        })
      )
    })
    return
  }

  if (__DEV__) {
    const app = express()

    // app.use(express.static(OUTPUT))

    // webpck hmr
    app.use(
      require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
      })
    )

    app.use(require('webpack-hot-middleware')(compiler))

    app.use(express.static(OUTPUT))
    app.use(express.static(TSDICT_CDN_STORE))

    app.get('/', (req, res) => {
      res.sendFile(OUTPUT_INDEX_HTML)
    })

    app.listen(PORT, () => {
      console.log(`listening on the http://localhost:${PORT}`)
    })
  }
}
