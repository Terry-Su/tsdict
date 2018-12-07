import { isPlainObject, isString } from 'lodash'
import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import TreeItem from '@/pages/TheTreePage/TheTreeView/TreeItem'
import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import List from '@material-ui/core/List'

import WordItem from './WordItem'

export default mapStateAndStyle()(
  class TheTreeView extends Component<any, any> {

    getTreeItem = ( node: TreeNode ) => {
      if ( isPlainObject( node ) ) {
        return <TreeItem key={ ( node as Tree ).name } tree={ node }/>
      }
      if ( isString( node ) ) {
        const wordId = node
        const word = selector.getWordByWordId( wordId )
        return notNil( word ) ? <WordItem key={wordId} word={ word }/> : null
      }
    }

    render() {
      const { currentTree } = selector
      const { nodes } = currentTree
      return (
        <div>
          <List>
          {
            nodes.map( node => this.getTreeItem( node ) )
          }
        </List>
        </div>
      )
    }
  }
)



