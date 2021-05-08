import express from 'express'
import https from 'https'
import fs from 'fs-extra'
import PATH from 'path'
const { PORT } = require( '../config' )


export const app = express()

var key  = fs.readFileSync( PATH.resolve( __dirname, '../sslcert/key.pem' ), 'utf8' )
var cert  = fs.readFileSync( PATH.resolve( __dirname, '../sslcert/cert.pem' ), 'utf8' )
var credentials = { key, cert }
const httpsServer = https.createServer( credentials, app )

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

httpsServer.listen( PORT, '0.0.0.0', () => {
  console.log( `Server on https://localhost:${ PORT }` )
} )