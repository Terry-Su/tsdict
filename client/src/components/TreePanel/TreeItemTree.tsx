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

@Actions( 'app', 'showRightClickMenu' )
@Selectors( "tree", "getTreeById" )
@Actions( "tree", "selectTree" )
export default class TreeItemTree extends Component<Props> {
  selections: TreeSelection[];
  showRightClickMenu: Function;
  getTreeById: Function;
  selectTree: Function;

  get tree(): TypeTree {
    return this.getTreeById( this.props.value.id ) || {}
  }

  handleClick = () => {
    this.selectTree( this.props.value.id )
  };

  handleRightClick = ( event: MouseEvent ) => {
    event.preventDefault()
    this.showRightClickMenu( [
      // { text: 'test', handleClick() { console.log( 'click test' ) } },
    ], event )
  }

  render() {
    const { columnIndex } = this.props
    return (
      <TreeItemBase
        type={ TreeItemType.Tree }
        icon="T"
        text={this.tree.name}
        columnIndex={columnIndex}
        onClick={this.handleClick}
        onContextMenu={ this.handleRightClick }
      />
    )
  }
}

const StyledRoot = styled.div``
