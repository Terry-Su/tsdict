import FS from 'fs-extra'
import PATH from 'path'

export default function getCustomConfig() {
  try {
      const customConfigFilePath = PATH.resolve( __dirname, "../../customConfig.ts" )
      if ( FS.pathExistsSync( customConfigFilePath ) ) {
          return require( customConfigFilePath )
      }
    } catch( e ) {}
  return {}
}