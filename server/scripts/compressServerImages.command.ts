import fs from 'fs-extra'
import glob from 'glob'
import minimist from 'minimist'
import path from 'path'

import compressImage from './compressImage'

const argMap = minimist( process.argv.slice( 2 ) )

const { dir: relativeDir } = argMap

const dir = path.resolve( __dirname, "..", relativeDir )

if ( fs.pathExists( dir ) ) {
  const images = glob.sync( `${dir}/**/*` ).filter( v => fs.statSync( v ).isFile() )

  // const imagePath = images[ 0 ]
  //   const { name, ext } = path.parse( imagePath )
  //   const targetExt = ext === ".png" ? ".jpeg" : ext
  //   const dist = path.resolve( path.dirname( imagePath ), `${name}${targetExt}` )
  //   compressImage( imagePath, dist ).then( () => console.log( `compress successfully: ${imagePath} to ${dist}` )
  //   )


  for ( let imagePath of images ) {
    const { name, ext } = path.parse( imagePath )
    const targetExt = ext === ".png" ? ".jpeg" : ext
    const dist = path.resolve( dir, `compressed` )
    fs.ensureDirSync( dist )
    // if ( !fs.pathExists( dist ) ) {
    //   fs.mkdirSync( dist )
    // }
    const distImagePath = path.resolve( dist, `${name}${targetExt}` )
    compressImage( imagePath, distImagePath ).catch( e => console.log( e, imagePath,distImagePath  ) )
  }
}
