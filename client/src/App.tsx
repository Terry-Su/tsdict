import React, { Component } from 'react'
import styled from 'styled-components'

import DialogIframeSetting from '@/components/dialogs/DialogIframeSetting'
import DialogSetting from '@/components/dialogs/DialogSetting'
import HomePage from '@/pages/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

import { SyncData } from './__typings__/app'
import DialogConfirm from './components/dialogs/DialogConfirm'
import Message from './components/messages/Message'
import RightClickMenu from './components/RightClickMenu'
import { reduxStore } from './entry'
import PopupDictPage from './pages/PopupDictPage'
import appApi from './services/modules/appApi'
import localStore from './store/localStore'

interface Props {}

@Selectors( "app", "syncData" )
@States( "app", "visibleRightClickMenu", "isPopupDictMode" )
@Actions(
  "app",
  "HIDE_RIGHT_CLICK_MENU",
  "SET_SEARCHING_WORD_NAME",
  "ENABLE_POPUP_DICT_MODE",
  "loadSyncData",
  "loadPulledData"
)
@Actions( "setting", "SET_ORIGIN" )
export default class Test extends Component<Props> {
  syncData: SyncData;
  visibleRightClickMenu: boolean;
  isPopupDictMode: boolean;
  HIDE_RIGHT_CLICK_MENU: Function;
  SET_ORIGIN: Function;
  SET_SEARCHING_WORD_NAME: Function;
  ENABLE_POPUP_DICT_MODE: Function;
  loadSyncData: Function;
  loadPulledData: Function;

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
    const serverOrigin = searchParams.get( "serverOrigin" )
    const searchingWord = searchParams.get( "searchingWord" )
    const isPopupDictMode = searchParams.get( "isPopupDictMode" )
    if ( serverOrigin != null ) {
      this.SET_ORIGIN( serverOrigin )
    }
    if ( isPopupDictMode != null ) {
      this.ENABLE_POPUP_DICT_MODE()

      const data: SyncData = await appApi.pull()
      this.loadPulledData( data )
    }
    if ( searchingWord != null ) {
      this.SET_SEARCHING_WORD_NAME( searchingWord )
    }
  }

  handleClick = () => {
    this.HIDE_RIGHT_CLICK_MENU()
  };
  render() {
    return (
      <StyledRoot onClick={this.handleClick}>
        {this.visibleRightClickMenu && <RightClickMenu />}
        {!this.isPopupDictMode ? <HomePage /> : <PopupDictPage />}

        {/* # dialogs */}
        <DialogIframeSetting />
        <DialogSetting />
        <DialogConfirm />

        {/* messages */}
        <Message />

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
