import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function __Template__( req, res, next ) {
  const {} = req.body
  const { results } = await sqlQuery( `` )
  res.send( results )
}