import fetch from 'isomorphic-fetch'
import express from 'express'
import FS from 'fs-extra'
import { STORE_DOWNLOAD_DICT_PAGES, STORE_CURRENT_DATA_FILE, PATH_DICT_URL_TXT } from '../src/constants/paths'
import PATH from 'path'
import GLOB from 'glob'
import { ClientData } from '../../client/src/__typings__'
import { JSDOM } from 'jsdom'

const download = async ( wordName, pageUrl ) => {
  const fileName = `${wordName}.html`
  const filePath = PATH.resolve( STORE_DOWNLOAD_DICT_PAGES, fileName )
  // # get html
  const html: any = await Promise.resolve( new Promise( ( resolve, reject ) => {
    // let timer = setTimeout( () => resolve( null ), 10000 * 5 )
    fetch( pageUrl ).then( response => resolve( response.text() ) ).catch( () => {
      // clearTimeout( timer )
      resolve( null )
    } )
  } ) )
  if ( html == null ) { return }
  // # get output string
  let outputStr = html
  try {
    const dom = new JSDOM( html )
    const { document } = dom.window
    const dictionaryDom = document.getElementsByClassName( 'dictionary' )[ 0 ]
    // # remove preconect links
    const preconnectedLinks = Array.from( document.querySelectorAll( "link[rel='preconnect']" ) )
    preconnectedLinks.forEach( ( link: any ) => link.remove() )
    outputStr = `<head>
    <link rel="stylesheet" href="https://d27ucmmhxk51xv.cloudfront.net/common.css?version=1.1.89">
</head>
${dictionaryDom.outerHTML}`
  } catch( e ) {
    outputStr = ''
  }
  
  FS.writeFileSync( filePath, outputStr, { encoding: 'utf8' } )
}


FS.ensureDirSync( STORE_DOWNLOAD_DICT_PAGES )
const filePaths = GLOB.sync( `${STORE_DOWNLOAD_DICT_PAGES}/**/*` )
const fileNames = filePaths.filter( filePath => FS.statSync( filePath ).isFile() ).map( filePath => PATH.parse( filePath ).name )

const clientData: ClientData = FS.readJSONSync( STORE_CURRENT_DATA_FILE )
const words = clientData.words
const wordNames = words.map( word => word.name )
const usefulWordNames = wordNames.filter( wordName => ! fileNames.includes( wordName ) )

{
  ( async () => {
    let count = 0
    let total = usefulWordNames.length
    let downloadCountEveryTime = 10000
    console.log( `Start Downloading, Total: ${total}` )
    let dictUrl = ''
    try {
      dictUrl = FS.readFileSync( PATH_DICT_URL_TXT, { encoding: 'utf8' } )
    } catch ( e ) {}

    const downloadFromRange = ( startIndex, endIndex ) => {
      let promises = []
      for ( let i = startIndex; i <= endIndex; i++ ) {
        const wordName = usefulWordNames[ i ]
        if( wordName == null ) { continue }
        const promise = new Promise( async resolve => {
          await download( wordName, `${dictUrl}${encodeURIComponent( wordName )}` )
          count++
          console.log( `${count}/${total}  (${ ( count * 100 / total ).toFixed( 2 ) }%)` )
          resolve()
        } )
        promises.push( promise )
      }
      return Promise.all( promises )
    }

    for ( let i = 0; i < total; i += downloadCountEveryTime ) {
      await downloadFromRange( i, i + downloadCountEveryTime - 1 )
    }
    console.log( 'All Downloaded!' )
  } )()
}
