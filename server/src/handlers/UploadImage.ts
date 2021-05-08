import { sqlQuery, sqlEscape } from "@src/utils/mysql"
import express from 'express'
import formidable from 'formidable'
import fs from 'fs-extra'
import PATH from 'path'
import { STORE_IMAGES } from '@src/constants/paths'
export default async function UploadImage( req: express.Request, res: express.Response, next ) {
  const form = new formidable( { multiples: true, maxFileSize: 1 * 1024 * 1024 * 1024 } )
  form.parse( req, ( err, fields, files ) => {
    if ( err ) {
      console.log( err )
      res.end( 'Upload failed!' )
    }
    const { imageBlob } = files
    fs.ensureDirSync( STORE_IMAGES )
    const extension = imageBlob.type.replace( /.*\//g, '' )
    const fileName = imageBlob.path.replace( /.*[\/\\]/g, '' )
    const outputPath = PATH.resolve( STORE_IMAGES, `${fileName}.${extension}` )
    fs.moveSync( imageBlob.path, outputPath )
    const imageUrl = `/images/${fileName}.${extension}`
    console.log( 'imageUrl', imageUrl )
    res.send( imageUrl )
    // FS.ensureDirSync( STORE_GIF )
    // const avaiableName = GET_STORE_GIF_UNIQUE_FILE_NAME( word.name )
    // const extension = file.type.replace( /.*\//g, '' )
    // const outputPath = PATH.resolve( STORE_GIF, `${avaiableName}.${extension}` )
    // FS.moveSync( file.path, outputPath, { overwrite: true } )
    // const imageUrl = `./${GET_URL_RELATIVE_TO_STORE_ROOT( outputPath )}`
    // res.send( imageUrl )
  } )
}