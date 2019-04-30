import FS from 'fs-extra'

export default function( base64Data: string, output: string ) {
  // data:image/jpeg;base64,
  const tagRule = /^data:.+?\/.+?;base64,/
  const tag = base64Data.match( tagRule )[0]
  const data = base64Data.replace(tagRule, "");
  FS.outputFileSync( output, data, {
    encoding: 'base64'
  } )
}