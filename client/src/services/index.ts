import request from "../utils/request"
import selector from "../selectors"

export const backup = data => request( `${ selector.server }/backup`, {
  method : 'post',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify( data )
} )