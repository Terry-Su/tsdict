import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function DescribeDirInfo( req, res, next ) {
  const { DirId = null } = req.body
  const { results: [ dir ] } = await sqlQuery( `select * from dirs where id = ${sqlEscape( DirId )}` )
  const { results: childrenDirs } = await sqlQuery( `select * from dirs where previousId ${DirId != null ? '=' : 'is'} ${sqlEscape( DirId )};` )
  res.send( { dir, childrenDirs  } )
}