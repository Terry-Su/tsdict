import { DirTreeItem } from "@src/config/dirModel"
import { sqlQuery, sqlEscape } from "@src/utils/mysql"
import DescribeDirTree from "./DescribeDirTree"

export default async function DeleteDir( req, res ) {
  const { DirId } = req.body
  // 不能删除根目录
  if ( DirId == null ) { res.send( null ); return }

  const dirTreeItem: DirTreeItem = await new Promise( resolve => {
    DescribeDirTree( { body: { DirId } }, { send: data => resolve( data ) } )
  } )
  const promises = []
  function recurToDelete( item: DirTreeItem ) {
    promises.push( sqlQuery( `delete from \`tsdict\`.\`dirs\` WHERE (\`id\` = '${sqlEscape( item.dir.id )}');` )  )
    item.childrenDirTreeItems.map( v => recurToDelete( v ) )
    item.childrenBriefModels.map( v => promises.push(
      sqlQuery( `delete from \`tsdict\`.\`models\` WHERE (\`id\` = '${sqlEscape( v.id )}');` )
    ) )
  }
  recurToDelete( dirTreeItem )
  await Promise.all( promises )  
  res.send()
}