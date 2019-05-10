import React, { Component } from 'react'
import styled from 'styled-components'

import { Position } from '@/__typings__'
import { Actions, Selectors, States } from '@/utils/decorators'

export interface PopupMenuItem {
  text: string
  handleClick?: Function
}

interface Props {
  items: PopupMenuItem[]
  position: Position
}

export default class PopupMenu extends Component<Props> {
  handleClickItem = ( event: MouseEvent, item ) => {
    item.handleClick( event )
  }

  render() {
    const { items = [], position = { x: 0, y: 0 } } = this.props
    return (
      <StyledRoot position={ position }>
        {
          items.map( ( item, index ) => <div className="item" key={ index } onClick={ ( event: any ) => this.handleClickItem( event, item ) }>{ item.text }</div> )
        }
      </StyledRoot>
    )
  }
}

const StyledRoot: any = styled.div`
  position: fixed;
  z-index: 1000;
  ${
    ( props: { position: Position } ) => `
    left: ${ props.position.x }px;
    top: ${ props.position.y }px;
    `
  }
  width: 200px;
  background: white;

  >.item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 0 0 10px;
    border: 1px solid grey;  
  }
`