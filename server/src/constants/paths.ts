import * as PATH from 'path'
import * as moment from 'moment'
import * as GLOB from 'glob'
import getUniqueId from '../utils/getUniqueId';
const { resolve, relative } = PATH

export const STORE_ROOT = resolve( __dirname, '../../store' )
const BACKUP = resolve( STORE_ROOT, 'backup' )

export const STORE_IMAGE = resolve( STORE_ROOT, 'image' )
export const STORE_AUDIO = resolve( STORE_ROOT, 'audio' )
export const STORE_VIDEO = resolve( STORE_ROOT, 'video' )


export const GET_BACKUP_CLIENT_DATA_UNIQUE_FILE = () => {
  const time = moment().format( '-YYYYMMDD-HHmmss' )
  return resolve( BACKUP, `clientData${ time }.json`  )
}

export const STORE_CURRENT_DATA_FILE = resolve( STORE_ROOT, 'clientData.json' )

export const GET_STORE_IMAGE_UNIQUE_FILE = () => {
  const name = `${moment().format( 'YYYYMMDD-HHmmss' )}-${getUniqueId()}`
  return resolve( STORE_IMAGE, name )
}


export const GET_URL_RELATIVE_TO_STORE_ROOT = path => relative( STORE_ROOT, path )


export const GET_STORE_IMAGE_FILES = () => {
  return GLOB.sync( `${STORE_IMAGE}/**/*` )
}

export const GET_STORE_AUDIO_FILES = () => {
  return GLOB.sync( `${STORE_AUDIO}/**/*` )
}

export const GET_STORE_VIDEO_FILES = () => {
  return GLOB.sync( `${STORE_VIDEO}/**/*` )
}




// Client
export const CLIENT_PUBLIC = resolve( __dirname, '../../../client/build' )
export const CLIENT_PUBLIC_INDEX = resolve( CLIENT_PUBLIC, 'index.html' )
export const CLIENT_PUBLIC_APP_CACHE = resolve( CLIENT_PUBLIC, 'cache.appcache' )