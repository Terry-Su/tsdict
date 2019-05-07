import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTreeColumn } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItem from './TreeItem'

interface Props {
  column: TypeTreeColumn
  columnIndex: number
}

export default class TreeColumn extends Component<Props> {
  render() {
    const { column, columnIndex } = this.props
    return (
      <StyledRoot>
        {
          column.map( ( v, index ) => <TreeItem value={ v } columnIndex={columnIndex} key={ index } /> )
        }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
`