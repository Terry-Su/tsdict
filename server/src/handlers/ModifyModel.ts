import { sqlQuery, sqlEscape } from "@src/utils/mysql"

export default async function ModifyModel( req, res ) {
  const { ModelId, Map } = req.body
  let updateInfos = Object.keys( Map ).map( v => ( { field: v, value: Map[ v ] } ) )
  const updateSql = updateInfos.map( v => `${sqlEscape( v.field ).replace( /^\'/, '' ).replace( /\'$/, '' )} = ${sqlEscape( v.value )}` ).join( ', ' )
  const { results } = await sqlQuery( `update models set ${updateSql} where id = ${sqlEscape( ModelId )};` )
  res.send( results )
}