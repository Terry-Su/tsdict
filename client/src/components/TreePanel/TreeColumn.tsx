import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTreeColumn, TreeItemType } from '@/__typings__/tree'
import VirtualScrollingList from '@/componentsPure/VirtualScrollingList/VirtualScrollingList'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItem from './TreeItem'

interface Props {
  column: TypeTreeColumn
  columnIndex: number
}

@Selectors( 'word', 'getWordById' )
export default class TreeColumn extends Component<Props> {
  getWordById?: Function

  render() {
    const { column, columnIndex } = this.props
    const sortedColumn = column.sort( (a, b) => {
      if ( b.type === TreeItemType.Tree && a.type === TreeItemType.Word) { return 1 }
      else if ( a.type === TreeItemType.Word && b.type === TreeItemType.Word ) {
        return this.getWordById(a.id).name[0] >= this.getWordById(b.id).name[0] ? 1 : -1
      }
    } )
    return (
      <StyledRoot>
        <VirtualScrollingList
          items={ sortedColumn }
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