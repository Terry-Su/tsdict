import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeItem } from '@/__typings__/tree'
import { TREE_ALL_WORDS, TREE_TAG_ROOT } from '@/constants/ids'
import { Actions, Selectors, States } from '@/utils/decorators'
import { notEmptyString } from '@/utils/getters'
import { CalcTree } from '@/utils/getters/tree'

import TreeItemBase from './TreeItemBase'

interface Props {
  value: TypeTreeItem;
  columnIndex: number;
}

@Actions( "app", "showRightClickMenu" )
@Actions( "review", "RESET_REVIEWD_IN_SELECTED_TREE" )
@Actions(
  "tag",
  "ADD_TAG_BY_NAME",
  "addTagWordByName",
  "SET_TAG_NAME",
  "DELETE_TAG"
)
@Actions(
  "tree",
  "ADD_TREE",
  "DELETE_TREE_BY_ID",
  "addTreeWordByName",
  "selectTree",
  "renameTree"
)
@Actions( "dialog", "confirm" )
@Selectors( "tag", "getTagByName" )
@Selectors(
  "tree",
  "getTreeById",
  "tagTreeIds",
  "isTreeTree",
  "isTagTree",
  "isTagRootTree",
  "isTreeRootTree"
)
@States( "tree", "selections",  )
@Selectors( "tree", "rootCalcTree", "getTreeRecursiveChidlrenWordNodesNotReviewedLength" )
export default class TreeItemTree extends React.PureComponent<Props> {
  selections?: TreeSelection[];
  tagTreeIds?: TypeId[];
  rootCalcTree?: CalcTree;
  getTreeRecursiveChidlrenWordNodesNotReviewedLength?: Function;
  SET_TAG_NAME?: Function;
  DELETE_TAG?: Function;
  addTagWordByName?: Function;
  ADD_TAG_BY_NAME?: Function;
  DELETE_TREE_BY_ID?: Function;
  ADD_TREE?: Function;
  RESET_REVIEWD_IN_SELECTED_TREE?: Function;
  isTreeTree?: Function;
  isTagTree?: Function;
  isTagRootTree?: Function;
  isTreeRootTree?: Function;
  getTagByName?: Function;
  showRightClickMenu?: Function;
  getTreeById?: Function;
  renameTree?: Function;
  addTreeWordByName?: Function;
  selectTree?: Function;
  confirm?: Function;

  get tree(): TypeTree {
    return this.getTreeById( this.props.value.id ) || {}
  }

  get tag(): TypeTag {
    return this.getTagByName( this.tree.name )
  }

  get isSelected(): boolean {
    return this.selections.some(
      selection => selection.type === TreeItemType.Tree &&
        selection.id === this.props.value.id
    )
  }

  get recursiveChidlrenWordNodesNotReviewedLength(): number {
    return this.getTreeRecursiveChidlrenWordNodesNotReviewedLength( this.tree )
  }

  get label(): string {
    return `${this.tree.name} ${this.tree.nodes.length}`
  }

  handleClick = () => {
    this.selectTree( this.props.value.id )
    this.RESET_REVIEWD_IN_SELECTED_TREE()
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
      {
        text: "Rename",
        handleClick() {
          const newName = window.prompt( "New Tag Name", self.tag.name )
          newName != null &&
            notEmptyString( newName ) &&
            self.SET_TAG_NAME( self.tag, newName )
        },
      },
      {
        text: "Delete",
        handleClick() {
          self.DELETE_TAG( self.tag )
        },
      },
    ]

    const treeCommonRightClickItems = [
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
        text: "Add Words",
        async handleClick() {
          const str = await self.confirm( `Word names(seperated by 'Enter'):` )
          if ( str.trim() === "" ) {
            return
          }
          const wordNames = str
            .split( "\n" )
            .filter( str => str.trim() !== "" )
            .map( str => str.trim() )
          const runByIndex = ( index: number ) => window[ "requestIdleCallback" ]( () => {
              setTimeout( () => {
                const wordName = wordNames[ index ]
                if ( wordName == null ) {
                  return
                }
                self.addTreeWordByName( wordName, self.tree )
                runByIndex( index + 1 )
              }, 0 )
            } )
          runByIndex( 0 )
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
        text       : "Show Not Reviewed Count",
        handleClick: () => {
          alert( this.recursiveChidlrenWordNodesNotReviewedLength )
        },
      },
    ]

    const treeNotRootRightClickItems = [
      ...treeCommonRightClickItems,
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

    const { tree } = this
    if ( this.isTagRootTree( tree ) ) {
      rightClickItems = tagRootRightClickItems
    } else if ( this.isTagTree( tree ) ) {
      rightClickItems = tagRightClickItems
    } else if ( this.isTreeTree( tree ) ) {
      if ( this.isTreeRootTree( tree ) ) {
        rightClickItems = treeCommonRightClickItems
      } else {
        rightClickItems = treeNotRootRightClickItems
      }
    }

    rightClickItems.length > 0 &&
      this.showRightClickMenu( rightClickItems, event )
  };

  render() {
    const { columnIndex } = this.props
    return (
      <TreeItemBase
        type={TreeItemType.Tree}
        icon="T"
        text={this.label}
        columnIndex={columnIndex}
        isSelected={this.isSelected}
        onClick={this.handleClick}
        onContextMenu={this.handleRightClick}
      />
    )
  }
}

const StyledRoot = styled.div``
