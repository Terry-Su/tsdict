import fs from 'fs-extra'

import { ClientData } from '../../client/src/__typings__'
import {
    STORE_CURRENT_DATA_FILE, STORE_CURRENT_DATA_FILE_UPDATE_TREE_ID
} from '../src/constants/paths'

export default function updateTreeIdInClientData() {
  const clientData: ClientData = fs.readJSONSync( STORE_CURRENT_DATA_FILE )

  // # update tree ids
  let num = -1
  const tree = clientData.core.tree
  const updateTreeId = ( tree ) => {
    num++
    const newId = num
    tree.id = newId
    tree.nodes.forEach( ( node, index ) => {
      if ( typeof node === 'object' ) {
        updateTreeId( node )
      }
    } )
  }
  updateTreeId( tree )

  // # rewrite client.json
  fs.writeJsonSync( STORE_CURRENT_DATA_FILE_UPDATE_TREE_ID, clientData )

  console.log( `update tree ids successfully` )
}