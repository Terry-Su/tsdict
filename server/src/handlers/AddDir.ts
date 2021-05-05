import { connection, sqlEscape } from "@src/utils/mysql"

export default function AddDir( req, res ) {
  const { DirName, PreviousId } = req.body
  connection.query( `insert into dirs values(null, ${sqlEscape( DirName )}, ${sqlEscape( PreviousId )});`, function ( error, results, fields ) {
  if ( error ) throw error
  res.send( results )
  } )
} 