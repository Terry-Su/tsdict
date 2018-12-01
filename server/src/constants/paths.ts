import * as PATH from 'path'
import * as moment from 'moment'
import getUniqueId from '../utils/getUniqueId';
const { resolve, relative } = PATH

export const STORE_ROOT = resolve( __dirname, '../../store' )
const BACKUP = resolve( STORE_ROOT, 'backup' )

export const STORE_IMAGE = resolve( STORE_ROOT, 'images' )


export const GET_BACKUP_CLIENT_DATA_FILE = () => {
  const time = moment().format( '-YYYYMMDD-hmmss' )
  return resolve( BACKUP, `clientData${ time }.json`  )
}

export const GET_STORE_MEDIA_FILE = () => {
  const name = `${moment().format( 'YYYYMMDD-hmmss' )}-${getUniqueId()}`
  return resolve( STORE_IMAGE, name )
}


export const GET_URL_RELATIVE_TO_STORE_ROOT = path => relative( STORE_ROOT, path )