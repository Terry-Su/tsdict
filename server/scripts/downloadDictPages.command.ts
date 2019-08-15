import fetch from 'isomorphic-fetch'
import express from 'express'
import FS from 'fs-extra'
import { STORE_DOWNLOAD_DICT_PAGES, STORE_CURRENT_DATA_FILE, PATH_DICT_URL_TXT } from '../src/constants/paths'
import PATH from 'path'
import GLOB from 'glob'
import { ClientData } from '../../client/src/__typings__'
import { JSDOM } from 'jsdom'

const download = async ( wordName, pageUrl ) => {
  const fileName = `${encodeURIComponent( wordName )}.html`
  const filePath = PATH.resolve( STORE_DOWNLOAD_DICT_PAGES, fileName )
  const html = await fetch( pageUrl ).then( response => response.text() )
  let outputStr = html
  try {
    const dom = new JSDOM( html )
    const { document } = dom.window
    const dictionaryDom = document.getElementsByClassName( 'dictionary' )[ 0 ]
    outputStr = `${document.head.outerHTML}\n${dictionaryDom.outerHTML}`
  } catch( e ) {}
  
  FS.writeFileSync( filePath, outputStr, { encoding: 'utf8' } )
}


FS.ensureDirSync( STORE_DOWNLOAD_DICT_PAGES )
const filePaths = GLOB.sync( `${STORE_DOWNLOAD_DICT_PAGES}/**/*` )
const fileNames = filePaths.filter( filePath => FS.statSync( filePath ).isFile() ).map( filePath => PATH.parse( filePath ).name )

const clientData: ClientData = FS.readJSONSync( STORE_CURRENT_DATA_FILE )
const words = clientData.words
const wordNames = words.map( word => word.name )
const usefulWordNames = wordNames.filter( wordName => ! fileNames.includes( encodeURIComponent( wordName ) ) )

{
  ( async () => {
    let count = 0
    let total = usefulWordNames.length
    console.log( `Start Downloading, Total: ${total}` )
    let dictUrl = ''
    try {
      dictUrl = FS.readFileSync( PATH_DICT_URL_TXT, { encoding: 'utf8' } )
    } catch ( e ) {}
    for ( let wordName of usefulWordNames ) {
      await download( wordName, `${dictUrl}${encodeURIComponent( wordName )}` )
      count++
      console.log( `${count}/${total}  (${ ( count * 100 / total ).toFixed( 2 ) }%)` )
    }
    console.log( 'All Downloaded!' )
  } )()
}
