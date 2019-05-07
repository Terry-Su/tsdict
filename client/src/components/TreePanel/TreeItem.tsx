import React, { Component } from 'react'
import styled from 'styled-components'

import { TreeItemType, TypeTreeItem } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItemTree from './TreeItemTree'
import TreeItemWord from './TreeItemWord'

interface Props {
  value: TypeTreeItem
  columnIndex: number
}

export default class TreeItem extends Component<Props> {
  render() {
    const { value, columnIndex } = this.props
    return (
      <StyledRoot>
        {
          value.type === TreeItemType.Tree ? <TreeItemTree value={value} columnIndex={columnIndex}/> : <TreeItemWord value={ value } columnIndex={columnIndex}/>
        }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
`