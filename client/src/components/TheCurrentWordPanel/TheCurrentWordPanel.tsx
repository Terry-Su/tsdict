import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import TheAddTag from '@/components/TheCurrentWordPanel/TheAddTag'
import TheDegree from '@/components/TheCurrentWordPanel/TheDegree'
import TheOnlineLinks from '@/components/TheCurrentWordPanel/TheOnlineLinks'
import ThePhoneticSymbol from '@/components/TheCurrentWordPanel/ThePhoneticSymbol'
import TheSearch from '@/components/TheCurrentWordPanel/TheSearch'
import selector from '@/selectors'
import { updateMedia } from '@/services'
import { GlobalStyle } from '@/style/globalStyle'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { IconButton, Tab, Tabs } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Note, { NoteData } from '../Note/Note'

class Props extends DefaultProps {
  enableClose: boolean
}
class State {
  tabIndex: number = 0
}
class Style extends GlobalStyle {
  searchRow = {
    display       : "flex",
    justifyContent: "space-between"
  }
}

export default mapStateAndStyle<Props>( { ...new Style() } )(
  class TheCurrentWordPanel extends BasicComponent<Props, State> {
    state = { ...new State() }

    onClosePanelClick = () => {
      this.dispatch( { type: "app/HIDE_CURRENT_WORD_PANEL" } )
    }

    onAddNoteClick = () => {
      const { currentWord: word } = selector
      notNil( word ) &&
        this.props.dispatch( {
          type : "core/UPDATE_WORD_ADD_ONE_NOTE",
          word,
          value: ""
        } )
    }
    onRemoveNoteClick = ( index: number ) => {
      const { currentWord: word } = selector
      notNil( word ) &&
        this.props.dispatch( {
          type : "core/UPDATE_WORD_REMOVE_ONE_NOTE",
          word,
          value: index
        } )
    }

    onNoteChange = async ( data: NoteData ) => {
      const { currentWord: word } = selector
      if ( notNil( word ) ) {
        this.props.dispatch( {
          type : "core/UPDATE_WORD_NOTE",
          word,
          value: data
        } )

        const newWord = await updateMedia()
        notNil( newWord ) &&
          this.props.dispatch( {
            type : "core/UPDATE_WORD_NOTE",
            word,
            value: newWord.note
          } )
      }
    }

    handleTabChange = ( event, tabIndex ) => {
      this.setState( {
        tabIndex
      } )
    }

    render() {
      const { classes: c, dispatch, enableClose = true } = this.props
      const {
        wordCanBeAdded: isNewWord,
        currentWord,
        shallShowWordPanel,
        appState
      } = selector
      const { searching } = appState
      const note = notNil( currentWord ) ? currentWord.note : null
      const { tabIndex } = this.state
      return (
        <div>
          <div className={c.searchRow}>
            <TheSearch />
            {enableClose && (
              <IconButton onClick={this.onClosePanelClick}>
                <CloseIcon />
              </IconButton>
            )}
          </div>
          <br />
          {shallShowWordPanel && (
            <div>
              <ThePhoneticSymbol />
              <TheDegree />
              <div>
                <TheAddTag />
              </div>

              <Tabs
                value={tabIndex}
                onChange={this.handleTabChange}
                scrollable
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Note" />
                <Tab label="links" />
              </Tabs>
              <br />

              {tabIndex === 0 && (
                <Note data={note} onChange={this.onNoteChange} />
              )}
              {tabIndex === 1 && <TheOnlineLinks />}
            </div>
          )}
        </div>
      )
    }
  }
)
