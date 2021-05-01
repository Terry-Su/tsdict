import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function RenameDir( req, res, next ) {
  const { DirId, NewDirName } = req.body
  if ( DirId === null ) { res.send( null ) }
  const { results } = await sqlQuery( `update dirs set name = ${sqlEscape( NewDirName )} where id = ${sqlEscape( DirId )};` )
  res.send( results )
}