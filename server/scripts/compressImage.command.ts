import minimist from 'minimist'
import path from 'path'
import compressImage from './compressImage';
import fs from 'fs-extra';

const argMap = minimist( process.argv.slice( 2 ) )

const { path: argPath } = argMap
if ( fs.pathExists( argPath ) ) {
  const { name, ext } = path.parse( argPath )
  const targetExt = ext === '.png' ? '.jpeg' : ext
  const dist = path.resolve( path.dirname( argPath ), `${name}.compressed${targetExt}` )
  compressImage( argPath, dist ).then( () => console.log( `compress successfully: ${argPath} to ${dist}` ) )
}
