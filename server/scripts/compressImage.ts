import fs from 'fs-extra'
import sharp from 'sharp'

export default async function compressImage( imageSrc: string, imageDist: string ) {
  const sharping = sharp( imageSrc )
  const info = await sharping.metadata()
  const { width, height } = info
  let max = 800
  if ( width > max ) {
    return sharping.resize( max ).toFile( imageDist, ( err, info ) =>  {
      if ( err ) { 
        console.log( err, info )
      }
    } )
  }
}