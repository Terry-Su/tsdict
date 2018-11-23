import request from "../utils/request"
import { getServer } from "../selectors"

export const backup = data => request( `${ getServer() }/backup`, {
  method : 'post',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify( data )
} )