import express from 'express'
import FS_ORIGIN from 'fs'
import FS from 'fs-extra'
import { JSDOM } from 'jsdom'
import PATH from 'path'
import READLINE from 'readline'
import { URL } from 'url'

import { DictDataWord } from '../../shared/__typings__/DictData'
import {
    GET_BACKUP_CLIENT_DATA_UNIQUE_FILE, GET_STORE_BACKUP_IMAGE_FILE_BY_NAME,
    GET_STORE_DICTS_1_HTML_FILES, GET_STORE_IMAGE_FILE_BY_NAME, GET_STORE_IMAGE_FILES,
    GET_STORE_IMAGE_UNIQUE_FILE_NAME, GET_STORE_PHONETIC_SYMBOLS_FILE,
    GET_URL_RELATIVE_TO_STORE_ROOT, Path, STORE_IMAGE, STORE_PHONETIC_SYMBOLS_FILE, STORE_ROOT
} from './constants/paths'
import { getImageUrls } from './getters'
import isBase64Url from './utils/isBase64Url'
import outputBase64Media from './utils/outputBase64Media'

const trash = require( "trash" )

export function backup( data ) {
  FS.outputJSONSync( GET_BACKUP_CLIENT_DATA_UNIQUE_FILE(), data )
}

// replace the media(image for example) url with server url instead of base64 url
export function updateMedia( word: DictDataWord, req: express.Request ) {
  const { note, name: wordName } = word

  function replaceServerUrl( url: string ) {
    const prefix = req.protocol + "://" + req.get( "host" )
    const urlInfo = new URL( url )
    return `${prefix}${urlInfo.pathname}`
  }

  function replaceImage( url ): string {
    let resolvedUrl = url
    const prefix = req.protocol + "://" + req.get( "host" )

    // resolve base64 url
    if ( isBase64Url( url ) ) {
      const extension = url
        .replace( /^data:.+?\//, "" )
        .replace( /;base64,.+/, "" )

      
      const name = GET_STORE_IMAGE_UNIQUE_FILE_NAME()
      const path = `${GET_STORE_IMAGE_FILE_BY_NAME( name )}.${extension}`
      outputBase64Media( url, path )

      const backupPath = `${GET_STORE_BACKUP_IMAGE_FILE_BY_NAME(
        name
      )}.${extension}`
      outputBase64Media( url, backupPath )
      resolvedUrl = `${prefix}/${GET_URL_RELATIVE_TO_STORE_ROOT( path )}`
    }

    const res = replaceServerUrl( resolvedUrl )
    return res
  }

  if ( note ) {
    const { ops } = note
    note.ops = note.ops.map( ( item: any ) => {
      if ( item.insert ) {
        if ( item.insert.image ) {
          const sourceUrl = item.insert.image
          let url = sourceUrl
          try {
            url = replaceImage( sourceUrl )
          } catch ( e ) {
            console.log( e )
          }
          item.insert.image = url
        }
        if ( item.insert.video ) {
          try {
            item.insert.video = replaceServerUrl( item.insert.video )
          } catch ( e ) {
            console.log( e )
          }
        }
      }
      return item
    } )
  }
  return word
}

export function cleanUselessMedias( words: DictDataWord[] ) {
  try {
    const imageUrls = getImageUrls( words )
    const relativePaths = imageUrls.map( url => {
      try {
        url = new URL( url )
        return decodeURIComponent( url.pathname )
      } catch ( e ) {
        console.log( e )
      }
      return url
    } )

    const storeImageFiles = GET_STORE_IMAGE_FILES()

    storeImageFiles.forEach( storeImageFile => {
      const storeReltivePath = `/${PATH.relative( STORE_ROOT, storeImageFile )}`
      if (
        relativePaths &&
        relativePaths.length > 0 &&
        !relativePaths.includes( storeReltivePath )
      ) {
        trash( storeImageFile ).then( () => {
          `${storeImageFile} was removed into trash`
        } )
      }
    } )
    return true
  } catch ( e ) {}
  return null
}

export function generateMdxDataToHtml( mdxDataFile: Path, output: Path ) {
  let isWordName = true
  let html = ""
  let wordName: string
  READLINE.createInterface( {
    input   : FS_ORIGIN.createReadStream( mdxDataFile ),
    terminal: false,
  } )
    .on( "line", line => {
      if ( isWordName ) {
        wordName = encodeURIComponent( line )
        html = ""
        isWordName = false
      } else if ( line === "</>" ) {
        if ( wordName && wordName.length > 0 ) {
          const outputFile = PATH.resolve( output, `${wordName}.html` )
          FS.writeFileSync( outputFile, html )
        }

        isWordName = true
        html = ""
      } else {
        html = html + line
        isWordName = false
      }
    } )
    .on( "close", () => {
      console.log( "completed" )
    } )
}

export function generatePhoneticSymbols() {
  let htmlFiles: any[] = GET_STORE_DICTS_1_HTML_FILES()
  run()
  let data = {}
  function run() {
    setTimeout( () => {
      const file = htmlFiles.pop()
      const name = PATH.basename( file ).replace( PATH.extname( file ), "" )
      if (
        ![ "-", `'`, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ].some( ( str: string ) => name.startsWith( str )
        ) &&
        !name.includes( "%" )
      ) {
        FS.readFile( file, { encoding: "utf8" } ).then( html => {
          const dom = new JSDOM( html )
          const targets = dom.window.document.getElementsByClassName( "uig" )
          if ( targets && targets.length > 0 ) {
            let texts = []
            for ( let target of targets ) {
              texts.push( target.innerHTML )
            }
            data[ name ] = texts
            console.log( name, texts.length )
            // FS.outputJSONSync(GET_STORE_PHONETIC_SYMBOLS_FILE( name ), data);
          }
         
        } )
      }
      if ( htmlFiles.length > 0 ) {
        run()
      }else {
        FS.outputJSONSync( STORE_PHONETIC_SYMBOLS_FILE, data )
      }
    }, 0 )
  }
}
