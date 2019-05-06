import fs from 'fs-extra'
import path from 'path'

import { ClientData } from '../../shared/__typings__/DictData'
import {
    GET_STORE_IMAGE_FILE_BY_NAME, GET_STORE_IMAGE_UNIQUE_FILE_NAME, STORE_CURRENT_DATA_FILE,
    STORE_CURRENT_DATA_FILE_RENAME_IMAGE
} from '../src/constants/paths'

export default function renameImageNameInClientDataAndFileSystem() {
  const renameImageInFileSystem = ( imageFileName: string, wordName: string, afterRenamed ) => {
    const file = GET_STORE_IMAGE_FILE_BY_NAME( imageFileName )
    const docodedFile = GET_STORE_IMAGE_FILE_BY_NAME( decodeURIComponent( imageFileName ) )
    if ( fs.pathExistsSync( file ) || fs.pathExistsSync( docodedFile ) ) {
      const newFileNameWithoutExt = GET_STORE_IMAGE_UNIQUE_FILE_NAME() 
      const ext = path.parse( imageFileName ).ext
      const newFileName = `${wordName}$${newFileNameWithoutExt}${ext}`
      const newFile = GET_STORE_IMAGE_FILE_BY_NAME( newFileName )
      
      // # rename image in file system
      fs.pathExistsSync( file ) && fs.renameSync( file, newFile )
      fs.pathExistsSync( docodedFile ) && fs.renameSync( docodedFile, newFile )
      afterRenamed( newFileName )
    } else {
      console.log( `image(${file}) not existed` )
    }
  }

  const clientData: ClientData = fs.readJSONSync( STORE_CURRENT_DATA_FILE )
  clientData.core.words.forEach( word => {
    if ( word && word.note && word.note.ops ) {
      word.note.ops.filter( v => v.insert && v.insert.image != null ).forEach( v => {
        const info = v.insert
        const { image } = info
        const { base: imageFileName, dir: parentPath } = path.parse( image )

        // # rename image in file system
        renameImageInFileSystem( imageFileName, word.name, newFileName => {
          // rename in clientData
          const newImage = `${parentPath}/${newFileName}`
          info.image = newImage
        } )
      } )
    }
  } )

  // # rewrite client.json
  fs.writeJsonSync( STORE_CURRENT_DATA_FILE_RENAME_IMAGE, clientData )

  console.log( `rename successfully` )
}