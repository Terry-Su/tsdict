export default function( files ): any {
  const defaults = {}
  files.keys().forEach( key => {
    if ( key === "./index.ts" ) return
    defaults[ key.replace( /(\.\/|\.ts)/g, "" ) ] = files( key ).default
  } )
  return defaults
}