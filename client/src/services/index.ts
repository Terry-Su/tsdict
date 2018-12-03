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

const get = ( url,config = {} ) => requestServer( url, {
  method : 'get',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  ...config,
} )


export const backup = data => post( 'backup', data )
export const pull = data => post( 'pull', data )
export const push = data => post( 'push', data )


// replace the media(image for example) url with server url instead of base64 url 
export const updateMedia = () => post( 'updateMedia', selector.currentWord.note )
export const updateMedias = () => post( 'updateMedias', selector.mainDataState.words )