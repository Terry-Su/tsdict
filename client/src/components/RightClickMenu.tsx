import React, { Component } from 'react'
import styled from 'styled-components'

import { TypePosition } from '@/__typings__'
import PopupMenu, { PopupMenuItem } from '@/componentsPure/PopupMenu/PopupMenu'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}


@States( 'app', 'rightClickMenuItems', 'rightClickMenuPosition' )
export default class RightClickMenu extends Component<Props> {
  rightClickMenuItems: PopupMenuItem[]
  rightClickMenuPosition: TypePosition
  
  render() {
    return (
      <PopupMenu items={ this.rightClickMenuItems } position={ this.rightClickMenuPosition }/>
    )
  }
}

const StyledRoot = styled.div``