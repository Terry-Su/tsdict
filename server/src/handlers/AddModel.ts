import { connection, sqlEscape } from "@src/utils/mysql"

export default function AddModel( req, res ) {
  const { ModelName, ModelNote, DirId } = req.body
  connection.query( `insert into models values(null, ${sqlEscape( DirId )}, ${sqlEscape( ModelName )}, ${sqlEscape( ModelNote )}, null, null, null, null);`, function ( error, results, fields ) {
  if ( error ) throw error
  res.send( results )
  } )
} 