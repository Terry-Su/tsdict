import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import { isTreeItem, isWordItem } from '@/utils/getters'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

import TreeItem from './TreeItem'
import WordItem from './WordItem'

class Props extends DefaultProps {
  treeNode: TreeNode
  selectedTreeId: string
  enableWord: boolean

  onSelectedTreeIdChange: Function
  isRoot: boolean
}
class State {}
class Style extends GlobalStyle {
  active = {
    background: "#3f51b5"
  }

  wordItemContainer={
    margin: '0 0 0 38px'
  }
}

const Item = mapStateAndStyle<Props>( new Style() )(
  class ItemClass extends BasicComponent<Props, State> {
    state = new State()

    get active(): boolean {
      const { selectedTreeId, treeNode } = this.props

      if ( isTreeItem( treeNode ) ) {
        return selectedTreeId === ( treeNode as Tree ).id
      }

      if ( isWordItem( treeNode ) ) {
        return selectedTreeId === treeNode
      }

      return false
    }

    render() {
      const {
        classes: c,
        dispatch,
        treeNode,
        selectedTreeId,
        onSelectedTreeIdChange,
        enableWord,
        isRoot
      } = this.props
      const { active } = this
      return (
        <div>
          {isTreeItem( treeNode ) && (
            <TreeItem
              active={active}
              tree={treeNode}
              selectedTreeId={selectedTreeId}
              onSelectedTreeIdChange={ onSelectedTreeIdChange }
              enableWord={enableWord}
              isRoot={isRoot}
            />
          )}
          <div className={`${c.wordItemContainer} ${active ? c.active : ""}`}>
            {isWordItem( treeNode ) && <WordItem wordId={treeNode} onSelectedTreeIdChange={onSelectedTreeIdChange} />}
          </div>
        </div>
      )
    }
  }
)

export default Item
