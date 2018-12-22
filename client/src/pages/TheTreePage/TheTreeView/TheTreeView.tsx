import { isPlainObject, isString } from 'lodash'
import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import { DefaultProps } from '@/components/BasicComponent'
import TreeItem from '@/pages/TheTreePage/TheTreeView/TreeItem'
import selector from '@/selectors'
import {
    filterWordsByDegreeRange, filterWordsBySelectedTagIds, sortBySize, sortWords
} from '@/shared/reorganizeItems'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { scrollToTop } from '@/utils/scrollToTop'
import List from '@material-ui/core/List'

import WordItem from './WordItem'

class Props extends DefaultProps {
  reorganizedNodes: TreeNode[]
  mainRef: any
}

export default mapStateAndStyle()(
  class TheTreeView extends Component<Props> {

    getTreeItem = ( node: TreeNode, mainRef: any ) => {
      if ( isPlainObject( node ) ) {
        return <TreeItem tree={ node } mainRef={mainRef}/>
      }
      if ( isString( node ) ) {
        const wordId = node
        const word = selector.getWordByWordId( wordId )
        return notNil( word ) ? <WordItem word={ word }/> : null
      }
    }

    render() {
      const { mainRef, reorganizedNodes } = this.props
      return (
        <div>
          <List>
          {
            reorganizedNodes.map( node => <div
              key = {
                isPlainObject( node ) ? ( node as Tree ).id : ( node as string )
              }
            >{this.getTreeItem( node, mainRef )}</div> )
          }
        </List>
        </div>
      )
    }
  }
)



