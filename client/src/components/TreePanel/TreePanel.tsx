import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTree } from '@/__typings__'
import { TreeSelection, TypeTreeColumn } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeColumn from './TreeColumn'

interface Props {
}


@States( 'tree', 'tree', 'selections' )
@Selectors( 'tree', 'columns' )
@Actions( 'tree', 'initialize' )
export default class TreePanel extends Component<Props> {
  tree: TypeTree
  selections: TreeSelection[]
  initialize: Function
  columns: TypeTreeColumn[]

  componentDidMount() {
    this.initialize()
  }

  render() {
    return (
      <StyledRoot>
        {
          this.columns.map( ( column, index ) => <TreeColumn column={ column } columnIndex={index} key={ index } /> )  
        }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  display: flex;
  width: 100%;
`