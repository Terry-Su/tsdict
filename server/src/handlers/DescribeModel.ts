import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function DescribeModel( req, res ) {
  const { ModelId = null } = req.body
  const { results: [ model ] } = await sqlQuery( `select * from models where id = ${sqlEscape( ModelId )}` )
  res.send( model )
}