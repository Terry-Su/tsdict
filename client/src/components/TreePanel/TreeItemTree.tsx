import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeItem } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItemBase from './TreeItemBase'

interface Props {
  value: TypeTreeItem;
  columnIndex: number;
}

@Actions( "app", "showRightClickMenu" )
@Selectors( "tree", "getTreeById" )
@Actions( "tree", "ADD_TREE", "DELETE_TREE_BY_ID", "selectTree", "renameTree" )
export default class TreeItemTree extends Component<Props> {
  selections?: TreeSelection[];
  showRightClickMenu?: Function;
  getTreeById?: Function;
  renameTree?: Function;
  DELETE_TREE_BY_ID?: Function;
  ADD_TREE?: Function;
  selectTree?: Function;

  get tree(): TypeTree {
    return this.getTreeById( this.props.value.id ) || {}
  }

  handleClick = () => {
    this.selectTree( this.props.value.id )
  };

  handleRightClick = ( event: MouseEvent ) => {
    event.preventDefault()
    const self = this
    this.showRightClickMenu(
      [
        {
          text: "Add Folder",
          handleClick() {
            const treeName = window.prompt( "Tree Name" )
            if ( treeName != null && treeName.trim() !== "" ) {
              self.ADD_TREE( treeName, self.tree )
            }
          },
        },
        {
          text: "Rename",
          handleClick() {
            const newName = window.prompt( "New Tree Name", self.tree.name )
            newName != null &&
              newName.trim() !== "" &&
              self.renameTree( self.props.value.id, newName )
          },
        },
        {
          text: "Delete",
          handleClick() {
            const confirmd = window.confirm( `Are you sure to delete the folder "${ self.tree.name }"?` )
            confirmd && self.DELETE_TREE_BY_ID( self.props.value.id )
          },
        },
      ],
      event
    )
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
