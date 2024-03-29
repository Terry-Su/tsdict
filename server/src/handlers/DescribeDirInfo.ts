import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function DescribeDirInfo( req, res ) {
  const { DirId = null } = req.body
  const isRootDir = DirId == null
  const { results: [ dir ] } = await sqlQuery( `select * from dirs where id = ${sqlEscape( DirId )}` )
  const { results: childrenDirs } = await sqlQuery( `select * from dirs where previousId ${DirId != null ? '=' : 'is'} ${sqlEscape( DirId )};` )
  const { results: childrenBriefModels } = await sqlQuery( `select * from models where dirId ${DirId != null ? '=' : 'is'} ${sqlEscape( DirId )};` )
  res.send( { isRootDir, dir, childrenDirs, childrenBriefModels  } )
}