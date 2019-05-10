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
@Actions( "app", "SET_SEARCHING_WORD_NAME", "showRightClickMenu" )
@Actions( "word", "deleteWord" )
export default class TreeItemWord extends Component<Props> {
  deleteWord?: Function
  SET_SEARCHING_WORD_NAME?: Function
  getWordById?: Function
  showRightClickMenu?: Function

  get word() {
    return this.getWordById( this.props.value.id )
  }

  onClick = () => {
    this.SET_SEARCHING_WORD_NAME( this.word.name )
  };

  handleRightClick = ( event: MouseEvent ) => {
    event.preventDefault()
    const self = this
    this.showRightClickMenu(
      [
        {
          text: "Delete",
          handleClick() {
            const confirmd = window.confirm( `Are you sure to delete the word "${ self.word.name }"?` )
            confirmd && self.deleteWord( self.word )
          },
        },
      ],
      event
    )
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
        onContextMenu={this.handleRightClick}
      />
    )
  }
}

const StyledRoot = styled.div``
