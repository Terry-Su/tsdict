import fs from "fs-extra"
import path from "path"
import sharp from "sharp"

export default async function compressImage(
  imageSrc: string,
  imageDist: string
) {
  let input
  if ( /^data:.+?\//.test( imageSrc ) ) {
    // # base64 url
    const usefulUrl = imageSrc.replace( /^data\:.+?\;base64\,/, '' )
    input = new Buffer( usefulUrl, "base64" )
  } else {
    // # url
    input = imageSrc
  }

  const sharping = sharp( input ).jpeg( {
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
