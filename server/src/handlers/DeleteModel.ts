import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function DeleteModel( req, res ) {
  const { ModelId } = req.body
  const { results } = await sqlQuery( `delete from \`tsdict\`.\`models\` WHERE (\`id\` = '${sqlEscape( ModelId )}');
  ` )
  res.send( results )
}