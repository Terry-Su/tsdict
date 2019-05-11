import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeItem } from '@/__typings__/tree'
import { TREE_TREE_ROOT } from '@/constants/ids'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItemBase from './TreeItemBase'

interface Props {
  value: TypeTreeItem;
  columnIndex: number;
}


@Actions( "app", "SET_SEARCHING_WORD_NAME", "showRightClickMenu" )
@Actions( "tag", "DELETE_WORD_ID_IN_TAG" )
@Actions( "tree", "DELETE_WORD_ID_IN_TREE", "selectWord" )
@Selectors( "tag", "getTagByName" )
@Selectors( "tree", "getTreeById", "tagTreeIds" )
@Selectors( "word", "getWordById" )
@States( "tree", "selections" )
export default class TreeItemWord extends Component<Props> {
  tagTreeIds: TypeId[]
  selections: TreeSelection[]
  getTagByName?: Function
  getTreeById?: Function
  DELETE_WORD_ID_IN_TAG?: Function
  DELETE_WORD_ID_IN_TREE?: Function
  SET_SEARCHING_WORD_NAME?: Function
  getWordById?: Function
  showRightClickMenu?: Function
  selectWord?: Function

  get word() {
    return this.getWordById( this.props.value.id )
  }

  get parentTree(): TypeTree {
    let parentTreeItem: TypeTreeItem
    const lastTreeItem: TypeTreeItem = this.selections[ this.selections.length - 1 ]
    if ( lastTreeItem.type === TreeItemType.Tree ) {
      parentTreeItem = lastTreeItem
    } else {
      parentTreeItem = this.selections[ this.selections.length - 2 ]
    }
    if ( parentTreeItem ) {
      return this.getTreeById( parentTreeItem.id )
    }
    return null
  }

  get parentTag(): TypeTag {
    return this.getTagByName( this.parentTree.name )
  }

  get isParentTreeTagTree(): boolean {
    return this.tagTreeIds.includes( this.parentTree.id )
  }

  get isUnderTreeRootTree(): boolean {
    return this.selections[ 0 ].id === TREE_TREE_ROOT
  }

  get isSelected(): boolean {
    return this.selections.some( selection => selection.type === TreeItemType.Word && selection.id === this.props.value.id )
  }

  onClick = () => {
    this.selectWord( this.props.value.id, this.parentTree )
    this.SET_SEARCHING_WORD_NAME( this.word.name )
  };

  handleRightClick = ( event: MouseEvent ) => {
    event.preventDefault()
    const self = this
    let rightClickItems = []
    
    if ( this.isParentTreeTagTree ) {
      rightClickItems = [
        {
          text: "Delete",
          handleClick() {
            const confirmd = window.confirm( `Are you sure to delete the word "${ self.word.name }"?` )
            confirmd && self.DELETE_WORD_ID_IN_TAG( self.word.id, self.parentTag )
          },
        },
      ]
    } else if ( this.isUnderTreeRootTree ) {
      rightClickItems = [
        {
          text: "Delete",
          handleClick() {
            const confirmd = window.confirm( `Are you sure to delete the word "${ self.word.name }"?` )
            confirmd && self.DELETE_WORD_ID_IN_TREE( self.word.id, self.parentTree )
          },
        },
      ]
    }

    this.showRightClickMenu(
      rightClickItems,
      event
    )
  };

  render() {
    const { columnIndex } = this.props
    const { word = {} } = this
    return (
      <TreeItemBase
        type={ TreeItemType.Word }
        icon="W"
        text={word.name}
        columnIndex={columnIndex}
        isSelected={ this.isSelected }
        onClick={this.onClick}
        onContextMenu={this.handleRightClick}
      />
    )
  }
}

const StyledRoot = styled.div``
