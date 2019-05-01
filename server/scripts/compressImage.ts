import fs from 'fs-extra'
import path from 'path'
import sharp from 'sharp'

export default async function compressImage( imageSrc: string, imageDist: string ) {
  const sharping = sharp( imageSrc ).jpeg( {
    // quality: 100,
  } )
  const info = await sharping.metadata()
  const { width, height } = info
  let max = 500
  const { ext } = path.parse( imageSrc ) 
  if ( width > max ) {
    return sharping.resize( max ).toFile( imageDist, ( err, info ) =>  {
      if ( err ) { 
        console.log( err, info )
      }
    } )
  } else if ( ext === '.png' ) {
    return sharping.resize( width ).toFile( imageDist, ( err, info ) =>  {
      if ( err ) { 
        console.log( err, info )
      }
    } )
  }

}