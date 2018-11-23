import * as PATH from 'path'
import * as moment from 'moment'
const { resolve } = PATH

const STORE_ROOT = resolve( __dirname, '../../store' )
const BACKUP = resolve( STORE_ROOT, 'backup' )


export const GET_BACKUP_CLIENT_DATA_FILE = () => {
  const time = moment().format( '-YYYYMMDD-hmmss' )
  return resolve( BACKUP, `clientData${ time }.json`  )
}