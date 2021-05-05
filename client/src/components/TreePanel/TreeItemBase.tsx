import React, { Component } from 'react'
import styled from 'styled-components'

import { TreeItemType, TreeSelection, TypeTreeItem } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeColumn from './TreeColumn'

interface Props {
  icon: string;
  text: string;
  columnIndex: number;
  type: TreeItemType;
  isSelected: boolean
  [propName: string]: any;
}

@States( "tree", "selections" )
export default class TreeItemBase extends Component<Props> {
  selections: TreeSelection[];

  get columnSelection(): TreeSelection {
    return this.selections[ this.props.columnIndex ]
  }

  get isActive(): boolean {
    const { columnSelection } = this
    const { type, id } = this.props
    return (
      columnSelection != null &&
      columnSelection.id === id &&
      columnSelection.type === type
    )
  }

  render() {
    const { icon, text, isSelected, ...rest } = this.props
    return (
      <StyledRoot isSelected={ isSelected } {...rest}>
        <span>{icon}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{text}</span>
      </StyledRoot>
    )
  }
}

const StyledRoot: any = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;

  ${ ( props: any ) => props.isSelected ? `
  background: #ddd;
  ` : `` }
`
