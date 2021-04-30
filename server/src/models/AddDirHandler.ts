import { connection } from "@src/mysql"
import { sqlEscape } from "@src/utils/sqlEscape"

export default function AddDirHandler( req, res, next ) {
  console.log( 'req.body', req.body )
  const { DirName, PreviousId } = req.body
  connection.query( `insert into dirs values(null, ${sqlEscape( DirName )}, ${sqlEscape( PreviousId )});`, function ( error, results, fields ) {
  if ( error ) throw error
  // console.log( 'The solution is: ', results[ 0 ].solution )
  res.send( results )
  } )
} 