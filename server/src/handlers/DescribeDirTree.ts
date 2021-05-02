import { DirTreeItem } from "@src/config/dirModel"
import { sqlQuery, sqlEscape } from "@src/utils/mysql"



export default async function DescribeDirTree( req, res ) {
  const { DirId } = req.body

  async function recur ( dirId, curry:DirTreeItem ) {
    const { results: [ dir ] } = await sqlQuery( `select * from dirs where id = ${sqlEscape( dirId )}` )
    const { results: childrenBriefModels } = await sqlQuery( `select * from models where dirId ${dirId != null ? '=' : 'is'} ${sqlEscape( dirId )};` )
    const { results: childrenDirs } = await sqlQuery( `select * from dirs where previousId ${dirId != null ? '=' : 'is'} ${sqlEscape( dirId )};` )
    curry.dir = dir
    curry.childrenBriefModels = childrenBriefModels
    const childrenDirTreeItems = []
    for ( const childDir of childrenDirs ) {
      const dirTreeItem = new DirTreeItem()
      await recur( childDir.id, dirTreeItem )
      childrenDirTreeItems.push( dirTreeItem )
    }
    curry.childrenDirTreeItems = childrenDirTreeItems
    return curry
  }

  const result:DirTreeItem = new DirTreeItem()
  await recur( DirId, result )
  res.send( result )
}