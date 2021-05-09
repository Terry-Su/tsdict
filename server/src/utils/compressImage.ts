import sharp from "sharp"
import fs from "fs-extra"

export default async function compressImage(
  imageSrc: string,
  imageDist: string,
  extension?: string
) {
  if ( [ 'gif', 'webp' ].includes( extension ) ) {
    fs.moveSync( imageSrc, imageDist )
    return
  }

  const sharping = sharp( imageSrc )
  .jpeg( {
    // quality: 100,
  } )
  const info = await sharping.metadata()
  const { width, height } = info
  let max = 500
  return new Promise( resolve => {
    if ( width > max ) {
      return sharping.resize( max ).toFile( imageDist, ( err, info ) => {
        resolve()
        if ( err ) {
          console.log( err, info )
        }
      } )
    } else {
      return sharping.resize( width ).toFile( imageDist, ( err, info ) => {
        if ( err ) {
          console.log( err, info )
        }
        resolve()
      } )
    }
  } )
}
