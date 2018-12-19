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
  shallShowFilterSection: boolean
  mainRef: any
}

export default mapStateAndStyle()(
  class TheTreeView extends Component<Props> {
    get reorganizedNodes(): TreeNode[] {
      const { shallShowFilterSection } = this.props
      const { nodes } = selector.currentTree
      let res = [ ...nodes ]
      let resTrees = res.filter( node => isPlainObject( node ) ) as Tree[]
      let resWordIds = res.filter( node => isString( node ) ) as string[]
      let resWords = resWordIds.map( id => selector.getWordByWordId( id ) )

      // filter
      if ( shallShowFilterSection ) {
        const {
          startDegree,
          endDegree,
          selectedTagIds
        } = selector.treePageState
        resWords = filterWordsBySelectedTagIds( resWords, selectedTagIds )
        resWords = filterWordsByDegreeRange( resWords, startDegree, endDegree )
      }

      const {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } = selector.treePageState
      // sort-trees
      resTrees = resTrees.sort( ( a, b ) => sortBySize( a.name, b.name, isAscendingName ) )

      // sort-words
      
      resWords = sortWords( resWords, {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } )

      resWordIds = resWords.map( word => word.id )
      res = [
        ...resTrees,
        ...resWordIds,
      ]
      return res
    }

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
      const { reorganizedNodes } = this
      const { mainRef } = this.props
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



