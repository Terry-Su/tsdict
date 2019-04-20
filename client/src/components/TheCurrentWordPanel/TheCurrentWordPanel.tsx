import React, { Component } from 'react'
import styled from 'styled-components'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import TheAddTag from '@/components/TheCurrentWordPanel/TheAddTag'
import TheDegree from '@/components/TheCurrentWordPanel/TheDegree'
import TheOnlineLinks from '@/components/TheCurrentWordPanel/TheOnlineLinks'
import ThePhoneticSymbol from '@/components/TheCurrentWordPanel/ThePhoneticSymbol'
import TheSearch from '@/components/TheCurrentWordPanel/TheSearch'
import selector from '@/selectors'
import { updateMedia } from '@/services'
import { GlobalStyle } from '@/style/globalStyle'
import events, { EventTypes } from '@/utils/event'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Button, IconButton, Tab, Tabs } from '@material-ui/core'
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
    justifyContent: "space-between",
  }
}

export default mapStateAndStyle<Props>( { ...new Style() } )(
  class TheCurrentWordPanel extends BasicComponent<Props, State> {
    state = { ...new State() }

    componentDidMount() {
      events.addHandler( EventTypes.keyDown, this.handleKeyDown )
    }

    componentWillUnmount() {
      events.removeHandler( EventTypes.keyDown, this.handleKeyDown )
      this.props.dispatch( { type: 'treePage/RESET_ACTIVE_WORD_IDS' } )
    }

    handleKeyDown = ( event ) => {
      if ( event.key === 'Escape' || event.key === 'Backspace' ) {
        this.handleClosePanelClick()
      }
      
      if( selector.canSwitchWord  ) {
        if (  event.key === 'ArrowLeft' ) {
          this.handlePrevClick()
        }
        if ( event.key === 'ArrowRight' ) {
          this.handleNextClick()
        }
      }
    }

    handleClosePanelClick = () => {
      this.dispatch( { type: "app/HIDE_CURRENT_WORD_PANEL" } )
    }

    onAddNoteClick = () => {
      const { currentWord: word } = selector
      notNil( word ) &&
        this.props.dispatch( {
          type : "core/UPDATE_WORD_ADD_ONE_NOTE",
          word,
          value: "",
        } )
    }
    onRemoveNoteClick = ( index: number ) => {
      const { currentWord: word } = selector
      notNil( word ) &&
        this.props.dispatch( {
          type : "core/UPDATE_WORD_REMOVE_ONE_NOTE",
          word,
          value: index,
        } )
    }

    onNoteChange = async ( data: NoteData ) => {
      const { currentWord: word } = selector
      if ( notNil( word ) ) {
        this.props.dispatch( {
          type : "core/UPDATE_WORD_NOTE",
          word,
          value: data,
        } )

        const newWord = await updateMedia()
        notNil( newWord ) &&
          this.props.dispatch( {
            type : "core/UPDATE_WORD_NOTE",
            word,
            value: newWord.note,
          } )
      }
    }

    handleTabChange = ( event, tabIndex ) => {
      this.setState( {
        tabIndex,
      } )
    }


    get prevId(): string {
      return selector.appState.activeWordIds.find( ( id, index, arr ) => arr[ index + 1 ] === selector.currentWord.id )
    }
    handlePrevClick = () => {
      if ( this.prevId ) {
        this.props.dispatch( {
          type : "app/UPDATE_SEARCHING_BY_ID",
          value: this.prevId,
        } )
      }
    }

    get nextId(): string {
      return selector.appState.activeWordIds.find( ( id, index, arr ) => arr[ index - 1 ] === selector.currentWord.id )
    }
    handleNextClick = () => {
      if ( this.nextId ) {
        this.props.dispatch( {
          type : "app/UPDATE_SEARCHING_BY_ID",
          value: this.nextId,
        } )
      }
    }

    render() {
      const { classes: c, dispatch, enableClose = true } = this.props
      const {
        wordCanBeAdded: isNewWord,
        currentWord,
        shallShowWordPanel,
        appState,
        isTreePage,
        canSwitchWord,
      } = selector
      const { searching } = appState
      const note = notNil( currentWord ) ? currentWord.note : null
      const { tabIndex } = this.state
      return (
        <StyledRoot>
          <div className={c.searchRow}>
            <TheSearch />
            {enableClose && (
              <IconButton onClick={this.handleClosePanelClick}>
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
                // scrollable
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

              {
                canSwitchWord && <>
                {
                  this.prevId != null && <Button className="jumpButton prevButton" onClick={ this.handlePrevClick } variant="contained">{"<"}</Button>
                }
                {
                  this.nextId != null && <Button className="jumpButton nextButton" onClick={ this.handleNextClick } variant="contained">{">"}</Button>
                }
                </>
              }
            </div>
          )}
        </StyledRoot>
      )
    }
  }
)

const StyledRoot = styled.div`
position: relative;

  .jumpButton {
    position: fixed;
    top: 50%;
    font-size: 16px;
    color: grey;
    padding:0;
    opacity: 0.2;

    &:hover {
      opacity: 1;
    }
  }
  .prevButton {
    left: 10px;
  }
  .nextButton {
    right: 10px;
  }
`