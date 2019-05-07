import React, { Component } from 'react'
import styled from 'styled-components'

import { TreeItemType, TypeTreeItem } from '@/__typings__/tree'
import { Actions, Selectors, States } from '@/utils/decorators'

import TreeItemBase from './TreeItemBase'

interface Props {
  value: TypeTreeItem;
  columnIndex: number;
}


@Selectors( "word", "getWordById" )
@Actions( "app", "SET_SEARCHING_WORD_NAME" )
export default class TreeItemWord extends Component<Props> {
  SET_SEARCHING_WORD_NAME?: Function
  getWordById: Function;

  get word() {
    return this.getWordById( this.props.value.id )
  }

  onClick = () => {
    this.SET_SEARCHING_WORD_NAME( this.word.name )
  };

  render() {
    const { columnIndex } = this.props
    const { word = {} } = this
    return (
      <TreeItemBase
        type={ TreeItemType.Word }
        icon="W"
        text={word.name}
        columnIndex={columnIndex}
        onClick={this.onClick}
      />
    )
  }
}

const StyledRoot = styled.div``
