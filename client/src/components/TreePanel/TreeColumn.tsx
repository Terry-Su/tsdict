import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTreeColumn } from '@/__typings__/tree'
import VirtualScrollingList from '@/componentsPure/VirtualScrollingList/VirtualScrollingList'
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
        <VirtualScrollingList
          items={ column }
          render={ ( { style, virtualScrollingItem } ) => <TreeItem style={ style } value={ virtualScrollingItem } columnIndex={columnIndex} /> }
        ></VirtualScrollingList>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%
`