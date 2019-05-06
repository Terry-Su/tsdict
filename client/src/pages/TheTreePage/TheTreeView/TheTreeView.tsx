import { isNumber, isPlainObject } from 'lodash'
import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import { DefaultProps } from '@/components/BasicComponent'
import VirtualScrollingList from '@/components/VirtualScrollingList/VirtualScrollingList'
import TreeItem from '@/pages/TheTreePage/TheTreeView/TreeItem'
import selector from '@/selectors'
import {
    filterWordsByDegreeRange, filterWordsBySelectedTagIds, sortBySize, sortWords
} from '@/shared/reorganizeItems'
import events, { EventTypes } from '@/utils/event'
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
        return <TreeItem tree={node} mainRef={mainRef} />
      }
      if ( isNumber( node ) ) {
        const wordId = node
        const word = selector.getWordByWordId( wordId )
        return notNil( word ) ? <WordItem word={word} wordIds={ this.props.reorganizedNodes } /> : null
      }
    }

    render() {
      const { mainRef, reorganizedNodes } = this.props
      return (
        <VirtualScrollingList
            rowHeight={ 60 }
            items={reorganizedNodes}
            render={( { style, virtualScrollingItem: node } ) => (
              <div
                style={style}
                // key = {
                //   isPlainObject( node ) ? ( node as Tree ).id : ( node as string )
                // }
              >
                {this.getTreeItem( node, mainRef )}
              </div>
            )}
          />
      )
    }
  }
)
