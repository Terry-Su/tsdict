import { sqlQuery, sqlEscape } from "@src/utils/mysql"
import express from 'express'

export default async function __Template__( req: express.Request, res: express.Response ) {
  const {} = req.body
  const { results } = await sqlQuery( `` )
  res.send( results )
}