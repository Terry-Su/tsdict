import React, { Component } from 'react'

import TopbarLayout from '@/components/layouts/TopbarLayout'
import Note, { NoteData } from '@/components/Note/Note'
import selector from '@/selectors'
import { updateMedia } from '@/services'
import { notNil } from '@/utils/lodash'
import mapState from '@/utils/mapState'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import TheAddTag from './TheAddTag'
import TheDegree from './TheDegree'
import TheOnlineLinks from './TheOnlineLinks'
import ThePhoneticSymbol from './ThePhoneticSymbol'
import TheSearch from './TheSearch'

export default mapState(
  class TheHomePage extends Component<any, any> {
    state = {
      tabIndex: 0
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
    // onNoteChange = ( event, index ) => {
    //   const { value } = event.target
    //   const { currentWord: word } = selector

    // }
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
      const { app } = this.props
      const { searching } = app
      const {
        wordCanBeAdded: isNewWord,
        currentWord,
        shallShowWordPanel
      } = selector
      const note = notNil( currentWord ) ? currentWord.note : null
      const { tabIndex } = this.state
      return (
        <TopbarLayout>
          <TheSearch />
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
        </TopbarLayout>
      )
    }
  }
)
