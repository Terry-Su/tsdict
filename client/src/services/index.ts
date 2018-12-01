import request from "../utils/request"
import selector from "../selectors"

const requestServer = ( url, ...args ) => request( `${selector.server}/${url}`, ...args )
const post = ( url, data, config = {} ) => requestServer( url, {
  method : 'post',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify( data ),
  ...config,
} )


export const backup = data => post( 'backup', data )


// replace the media(image for example) url with server url instead of base64 url 
export const resolveNote = () => post( 'resolveNote', selector.currentWord.note )