import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function DeleteDir( req, res, next ) {
  const { DirId } = req.body
  const { results } = await sqlQuery( `delete from \`tsdict\`.\`dirs\` WHERE (\`id\` = '${sqlEscape( DirId )}');
  ` )
  res.send( results )
}