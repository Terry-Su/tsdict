import { connection } from "@src/utils/mysql"

export default async function Test( req, res, next ) {
  connection.query( 'SELECT 1 + 1 AS solution', function ( error, results, fields ) {
    if ( error ) throw error
    console.log( 'The solution is: ', results[ 0 ].solution )
  } )
}