import React, { Component } from 'react'
import styled from 'styled-components'

import HomePage from '@/pages/HomePage/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

import { SyncData } from './__typings__/app'
import RightClickMenu from './components/RightClickMenu'
import { reduxStore } from './entry'
import localStore from './store/localStore'

interface Props {
  
}


@Actions( 'app', 'HIDE_RIGHT_CLICK_MENU', 'loadSyncData' )
@Selectors( 'app', 'syncData' )
@States( 'app', 'visibleRightClickMenu' )
export default class Test extends Component<Props> {
  syncData: SyncData
  visibleRightClickMenu: boolean
  HIDE_RIGHT_CLICK_MENU: Function
  loadSyncData: Function


  componentDidMount() {
    const localCachedStore: SyncData = localStore.getStore()
    if ( localCachedStore != null ) {
      this.loadSyncData( localCachedStore )
    }

    reduxStore.subscribe( () => {
      localStore.setStore( this.syncData )
    } )
  }

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