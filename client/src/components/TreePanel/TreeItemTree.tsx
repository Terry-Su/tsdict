import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeItem } from '@/__typings__/tree'
import { TREE_ALL_WORDS, TREE_TAG_ROOT } from '@/constants/ids'
import { Actions, Selectors, States } from '@/utils/decorators'
import { notEmptyString } from '@/utils/getters'

import TreeItemBase from './TreeItemBase'

interface Props {
  value: TypeTreeItem;
  columnIndex: number;
}

@Selectors( "tag", "getTagByName" )
@Selectors( "tree", "getTreeById", "tagTreeIds" )
@Actions( "app", "showRightClickMenu" )
@Actions( "tag", "ADD_TAG_BY_NAME", "addTagWordByName", "SET_TAG_NAME", "DELETE_TAG" )
@Actions(
  "tree",
  "ADD_TREE",
  "DELETE_TREE_BY_ID",
  "addTreeWordByName",
  "selectTree",
  "renameTree"
)
export default class TreeItemTree extends Component<Props> {
  selections?: TreeSelection[];
  tagTreeIds?: TypeId[];
  getTagByName?: Function;
  showRightClickMenu?: Function;
  getTreeById?: Function;
  renameTree?: Function;
  addTreeWordByName?: Function;
  SET_TAG_NAME?: Function;
  DELETE_TAG?: Function;
  addTagWordByName?: Function;
  ADD_TAG_BY_NAME?: Function;
  DELETE_TREE_BY_ID?: Function;
  ADD_TREE?: Function;
  selectTree?: Function;

  get tree(): TypeTree {
    return this.getTreeById( this.props.value.id ) || {}
  }

  get isTagTree(): boolean {
    return this.tagTreeIds.includes( this.tree.id )
  }

  get isTagRootTree(): boolean {
    return this.tree.id === TREE_TAG_ROOT
  }

  get isTreeAllWords(): boolean {
    return this.tree.id === TREE_ALL_WORDS
  }

  get tag(): TypeTag {
    return this.getTagByName( this.tree.name )
  }

  handleClick = () => {
    this.selectTree( this.props.value.id )
  };

  handleRightClick = ( event: MouseEvent ) => {
    event.preventDefault()
    const self = this

    let rightClickItems = []

    const tagRootRightClickItems = [
      {
        text: "Add Tag",
        handleClick() {
          const tagName = window.prompt( "Tag Name" )
          if ( tagName != null && notEmptyString( tagName ) ) {
            self.ADD_TAG_BY_NAME( tagName )
          }
        },
      },
    ]

    const tagRightClickItems = [
      {
        text: "Add Word",
        handleClick() {
          const wordName = window.prompt( "Word Name" )
          wordName != null &&
            notEmptyString( wordName ) &&
            self.addTagWordByName( self.tag, wordName )
        },
      },
      { text: "Rename",
handleClick() {
        const newName = window.prompt( "New Tag Name", self.tag.name )
          newName != null &&
            notEmptyString( newName ) &&
            self.SET_TAG_NAME( self.tag, newName )
      } },
      {
        text: "Delete",
        handleClick() {
          self.DELETE_TAG( self.tag )
        },
      },
    ]

    const treeClickItems = [
      {
        text: "Add Word",
        handleClick() {
          const wordName = window.prompt( "Word Name" )
          wordName != null &&
            notEmptyString( wordName ) &&
            self.addTreeWordByName( wordName, self.tree )
        },
      },
      {
        text: "Add Folder",
        handleClick() {
          const treeName = window.prompt( "Tree Name" )
          if ( treeName != null && notEmptyString( treeName ) ) {
            self.ADD_TREE( treeName, self.tree )
          }
        },
      },
      {
        text: "Rename",
        handleClick() {
          const newName = window.prompt( "New Tree Name", self.tree.name )
          newName != null &&
            notEmptyString( newName ) &&
            self.renameTree( self.tree, newName )
        },
      },
      {
        text: "Delete",
        handleClick() {
          const confirmd = window.confirm(
            `Are you sure to delete the folder "${self.tree.name}"?`
          )
          confirmd && self.DELETE_TREE_BY_ID( self.props.value.id )
        },
      },
    ]

    if ( this.isTagRootTree ) {
      rightClickItems = tagRootRightClickItems
    } else if ( this.isTagTree ) {
      rightClickItems = tagRightClickItems
    } else if ( this.isTreeAllWords ) {
      
    } else {
      rightClickItems = treeClickItems
    }

    this.showRightClickMenu( rightClickItems, event )
  };

  render() {
    const { columnIndex } = this.props
    return (
      <TreeItemBase
        type={TreeItemType.Tree}
        icon="T"
        text={this.tree.name}
        columnIndex={columnIndex}
        onClick={this.handleClick}
        onContextMenu={this.handleRightClick}
      />
    )
  }
}

const StyledRoot = styled.div``
