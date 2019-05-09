import React, { Component } from 'react'
import styled from 'styled-components'

import HomePage from '@/pages/HomePage/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

import RightClickMenu from './components/RightClickMenu'

interface Props {
  
}


@Actions( 'app', 'HIDE_RIGHT_CLICK_MENU' )
@States( 'app', 'visibleRightClickMenu' )
export default class Test extends Component<Props> {
  visibleRightClickMenu: boolean
  HIDE_RIGHT_CLICK_MENU: Function

  handleClick = () => {
    this.HIDE_RIGHT_CLICK_MENU()
  }

  render() {
    return (
      <StyledRoot onClick={ this.handleClick }>
        { this.visibleRightClickMenu && <RightClickMenu /> }
        <HomePage />
        <React.Fragment>
        <GlobalStyle />
        </React.Fragment>
      </StyledRoot>
    )
      
      
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`