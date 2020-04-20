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
import DevBookPage from './pages/DevBookPage'
import PopupDictPage from './pages/PopupDictPage'
import appApi from './services/modules/appApi'
import localStore from './store/localStore'
import Audio from '@/components/Audio'

interface Props { }

@Selectors('app', 'syncData')
@States('app',
  'visibleRightClickMenu', 'isPopupDictMode', 'isDevBookMode')
@States('dialog', 'visibleDialogConfirm')
@Actions(
  'app',
  'HIDE_RIGHT_CLICK_MENU',
  'SET_SEARCHING_WORD_NAME',
  'ENABLE_POPUP_DICT_MODE',
  'loadSyncData',
  'loadPulledData'
)
@Actions('word', 'updateWordMapByWords')
@Actions('setting', 'SET_ORIGIN')
export default class Test extends Component<Props> {
  syncData: SyncData;
  visibleRightClickMenu: boolean;
  isPopupDictMode: boolean;
  visibleDialogConfirm: boolean;
  isDevBookMode: Boolean;
  HIDE_RIGHT_CLICK_MENU: Function;
  SET_ORIGIN: Function;
  SET_SEARCHING_WORD_NAME: Function;
  ENABLE_POPUP_DICT_MODE: Function;
  loadSyncData: Function;
  loadPulledData: Function;
  updateWordMapByWords: Function;

  constructor (props) {
    // componentDidMount() {
    super(props)
    const localCachedStore: SyncData = localStore.getStore()
    if (localCachedStore != null) {
      this.loadSyncData(localCachedStore)
    }
    this.updateWordMapByWords()
  }

  componentDidMount () {
    reduxStore.subscribe(() => {
      localStore.setStore(this.syncData)
    })
    this.initializeByUrlParams()
  }

  async initializeByUrlParams () {
    const { searchParams } = new URL(location.href)
    const origin = searchParams.get('origin')
    const searchingWord = searchParams.get('searchingWord')
    const isPopupDictMode = searchParams.get('isPopupDictMode')
    if (origin != null) {
      this.SET_ORIGIN(origin)
    }

    const pullDataAndSetSearchingWord = async (searchingWordName: string) => {
      const data: SyncData = await appApi.pull()
      this.loadPulledData(data)
      this.updateWordMapByWords()
      if (origin != null) {
        this.SET_ORIGIN(origin)
      }
      if (searchingWord != null) {
        this.SET_SEARCHING_WORD_NAME(searchingWordName)
      }
    }

    if (isPopupDictMode != null) {
      this.ENABLE_POPUP_DICT_MODE()
      await pullDataAndSetSearchingWord(searchingWord)
    }

    // # listen to message
    if (isPopupDictMode) {
      window.onmessage = async (e) => {
        console.log('e.data', e.data)
        if (e.data != null) {
          const { searchingWordName } = e.data
          if (searchingWordName != null) {
            await pullDataAndSetSearchingWord(searchingWordName)
          }
        }
      }
    }
  }

  handleClick = () => {
    this.visibleRightClickMenu && this.HIDE_RIGHT_CLICK_MENU()
  };

  render () {
    return (
      !this.isDevBookMode
        ? <StyledRoot onClick={this.handleClick}>
          {this.visibleRightClickMenu && <RightClickMenu />}
          {!this.isPopupDictMode ? <HomePage /> : <PopupDictPage />}

          {/* # dialogs */}
          <DialogIframeSetting />
          <DialogSetting />
          {this.visibleDialogConfirm && <DialogConfirm />}

          {/* messages */}
          <Message />

          {/* # audio */}
          <Audio />
          <React.Fragment>
            <GlobalStyle />
          </React.Fragment>
        </StyledRoot>
        : <DevBookPage>
          {/* # dialogs */}
          <DialogIframeSetting />
          <DialogSetting />
          {this.visibleDialogConfirm && <DialogConfirm />}

          {/* messages */}
          <Message />
          {/* # audio */}
          <Audio />
          <React.Fragment>
            <GlobalStyle />
          </React.Fragment>
        </DevBookPage>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`
