import fetch from "dva/fetch"

export default async function( url, options = {} ) {
  const response = await fetch( url, options )
  return checkStatus( response ) ? response.json() : null
}

function checkStatus( response ) {
  if ( response.status >= 200 && response.status < 300 ) {
    return true
  }

  const error: any = new Error( response.statusText )
  error.response = response
  // throw error
  console.log( error )
}
