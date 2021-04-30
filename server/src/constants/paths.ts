import FS from 'fs-extra'
import GLOB from 'glob'
import moment from 'moment'
import PATH from 'path'

import getUniqueId from '../utils/getUniqueId'
import { notNil } from '../utils/lodash'
import numberToChars from '../utils/numberToChars'
import getCustomConfig from '../utils/getCustomConfig'

const { resolve, relative } = PATH

export type Path = string

const potentialStoreRoot = resolve( __dirname, '../../store' )

const customConfig = getCustomConfig()

const { SYNC_STORE_PATH } = customConfig
export const STORE_ROOT = SYNC_STORE_PATH != null ? SYNC_STORE_PATH : potentialStoreRoot
const BACKUP = resolve( STORE_ROOT, 'backup' )

export const STORE_GIF = resolve( STORE_ROOT, 'gif' )
export const STORE_IMAGE = resolve( STORE_ROOT, 'image' )
export const STORE_BACKUP_IMAGE = resolve( STORE_ROOT, 'backupImage' )
export const STORE_AUDIO = resolve( STORE_ROOT, 'audio' )
export const STORE_VIDEO = resolve( STORE_ROOT, 'video' )
export const STORE_DICTS = resolve( STORE_ROOT, 'dicts' )
export const STORE_DOWNLOAD_DICT_PAGES = resolve( STORE_ROOT, 'dictPages' )
export const STORE_CURRENT_DATA_FILE = resolve( STORE_ROOT, 'clientData.json' )
export const STORE_CURRENT_DATA_FILE_RENAME_IMAGE = resolve( STORE_ROOT, 'clientData-rename-image.json' )
export const STORE_CURRENT_DATA_FILE_UPDATE_WORD_ID = resolve( STORE_ROOT, 'clientData-update-word-id.json' )
export const STORE_CURRENT_DATA_FILE_UPDATE_TREE_ID = resolve( STORE_ROOT, 'clientData-update-tree-id.json' )
// # dicts in store
export const DICT_WEBSTER = resolve( STORE_DICTS, '1/integration' )

export const STORE_DICTS_1_MDX_SOURCE = resolve( STORE_DICTS, '1/source' )
export const STORE_DICTS_1_HTML = resolve( STORE_DICTS, '1/html' )
export const GET_STORE_DICTS_1_HTML_FILES = () => GLOB.sync( `${STORE_DICTS_1_HTML}/*` )


export const RELATIVE_PHONETIC_SYMBOLS_FILE = 'phoneticSymbols/phoneticSymbols.json'
export const STORE_PHONETIC_SYMBOLS_FILE = resolve( STORE_ROOT, 'phoneticSymbols/phoneticSymbols.json' )
export const GET_STORE_PHONETIC_SYMBOLS_FILE = name => resolve( STORE_ROOT, `phoneticSymbols/${name}.json` )




export const GET_BACKUP_CLIENT_DATA_UNIQUE_FILE = () => {
  const time = moment().format( '-YYYYMMDD-HHmmss' )
  return resolve( BACKUP, `clientData${ time }.json`  )
}


const GET_IMAGE_UNIQUE_FILE_NAME = ( wordName: string, dir: string ) => {
  let num = 0
  let res = null
  while ( res === null ) {
    const name = numberToChars( num )
    const possibleFiles = [
      '.jpeg',
      '.png',
      '.jpg',
      '.gif',
      '.webp',
    ].map( v => PATH.resolve( dir, `${wordName}$${name}${v}` ) )
    if ( possibleFiles.every( v => ! FS.pathExistsSync( v ) ) ) {
      res = `${wordName}$${name}`
    }
    num++
  }
  return res
}

export const GET_STORE_IMAGE_UNIQUE_FILE_NAME = ( wordName: string ) => GET_IMAGE_UNIQUE_FILE_NAME( wordName, STORE_IMAGE )

export const GET_STORE_GIF_UNIQUE_FILE_NAME = ( wordName: string ) => GET_IMAGE_UNIQUE_FILE_NAME( wordName, STORE_GIF )

export const GET_STORE_IMAGE_FILE_BY_NAME = name => resolve( STORE_IMAGE, name )

export const GET_STORE_BACKUP_IMAGE_FILE_BY_NAME = name => resolve( STORE_BACKUP_IMAGE, name )


export const GET_URL_RELATIVE_TO_STORE_ROOT = path => relative( STORE_ROOT, path )


export const GET_STORE_IMAGE_FILES = () => GLOB.sync( `${STORE_IMAGE}/**/*` )

export const GET_STORE_AUDIO_FILES = () => GLOB.sync( `${STORE_AUDIO}/**/*` )

export const GET_STORE_VIDEO_FILES = () => GLOB.sync( `${STORE_VIDEO}/**/*` )

// # dict url
export const PATH_DICT_URL_TXT = resolve( STORE_ROOT, 'dictUrl.txt' )




// # Client
export const CLIENT_PUBLIC = resolve( __dirname, '../../../../tsdict-client/dist' )
export const CLIENT_PUBLIC_INDEX = resolve( CLIENT_PUBLIC, 'index.html' )
// export const CLIENT_PUBLIC_APP_CACHE = resolve( CLIENT_PUBLIC, 'cache.appcache' )
