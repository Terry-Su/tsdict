import express from 'express'

import { PORT } from '../config'

const app = express()

export default app

// Enable cross-domain
app.use( function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" )
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" )
  next()
} )

// resolve post body data
app.use( express.json( {
  limit: '50mb',
} ) )



import './model'

app.listen( PORT, () => {
  console.log( `Server on http://localhost:${ PORT }` )
} )
