import React, { Component } from 'react'
import styled from 'styled-components'

import HomePage from '@/pages/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

import { SyncData } from './__typings__/app'
import RightClickMenu from './components/RightClickMenu'
import { reduxStore } from './entry'
import appApi from './services/modules/appApi'
import localStore from './store/localStore'

interface Props {
  
}


@Selectors( 'app', 'syncData' )
@States( 'app', 'visibleRightClickMenu' )
@Actions( 'app', 'HIDE_RIGHT_CLICK_MENU', 'SET_SEARCHING_WORD_NAME', 'loadSyncData', 'loadPulledData' )
@Actions( 'setting', 'SET_ORIGIN' )
export default class Test extends Component<Props> {
  syncData: SyncData
  visibleRightClickMenu: boolean
  HIDE_RIGHT_CLICK_MENU: Function
  SET_ORIGIN: Function
  SET_SEARCHING_WORD_NAME: Function
  loadSyncData: Function
  loadPulledData: Function


  constructor( props ) {
  // componentDidMount() {
    super( props )
    const localCachedStore: SyncData = localStore.getStore()
    if ( localCachedStore != null ) {
      this.loadSyncData( localCachedStore )
    }
  }
  componentDidMount() {
    reduxStore.subscribe( () => {
      localStore.setStore( this.syncData )
    } )
    this.initializeByUrlParams()
  }

  async initializeByUrlParams() {
    const { searchParams } = new URL( location.href )
    const shouldPullDataFromServer = searchParams.get( 'shouldPullDataFromServer' )
    const serverOrigin = searchParams.get( 'serverOrigin' )
    const searchingWord = searchParams.get( 'searchingWord' )
    if ( shouldPullDataFromServer && serverOrigin != null ) {
      this.SET_ORIGIN( serverOrigin )
      const data: SyncData = await appApi.pull()
      this.loadPulledData( data )
    }
    if ( searchingWord != null ) {
      this.SET_SEARCHING_WORD_NAME( searchingWord )
    }
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