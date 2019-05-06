import fs from 'fs-extra'

import { ClientData } from '../../client/src/__typings__'
import {
    STORE_CURRENT_DATA_FILE, STORE_CURRENT_DATA_FILE_UPDATE_WORD_ID
} from '../src/constants/paths'

export default function udpateWordIdInClientData() {
  const clientData: ClientData = fs.readJSONSync( STORE_CURRENT_DATA_FILE )

  // # get new words
  let num = -1
  const tree = clientData.core.tree
  const tags = clientData.core.tags
  const app = clientData.app
  const updateTreeId = ( tree, prevWordId, newWordId ) => {
    tree.nodes.forEach( ( node, index ) => {
      if ( typeof node === 'object' ) {
        updateTreeId( node, prevWordId, newWordId )
      } else if ( node === prevWordId ) {
        tree.nodes[ index ] = newWordId
      }
    } )
  }
  const newWords = clientData.core.words.map( word => {
    const prevWordId = word.id
    // # map each word to generate new id
    num++
    const newWordId = num

    // # update the id in tree
    updateTreeId( tree, prevWordId, newWordId )
    

    // # update the id in tags
    tags.forEach( tag => {
      tag.ids.forEach( ( id, index ) => {
        if ( id === prevWordId ) {
          tag.ids[ index ] = newWordId
        }
      } )
    } )



    return {
      ...word,
      id: newWordId,
    }
  } )

  // # update words
  clientData.core.words = newWords

  // # empty activeIds
  app.activeWordIds = []

  // # rewrite client.json
  fs.writeJsonSync( STORE_CURRENT_DATA_FILE_UPDATE_WORD_ID, clientData )

  console.log( `update word ids successfully` )
}