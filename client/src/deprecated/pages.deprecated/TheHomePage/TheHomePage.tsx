import React, { Component } from 'react'

import TopbarLayout from '@/components/layouts/TopbarLayout'
import Note, { NoteData } from '@/components/Note/Note'
import selector from '@/selectors'
import { updateMedia } from '@/services'
import { notNil } from '@/utils/lodash'
import mapState from '@/utils/mapState'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

export default mapState(
  class TheHomePage extends Component<any, any> {
    state = {
      tabIndex: 0,
    }

    componentDidMount() {
      this.props.dispatch( { type: "app/UPDATE_ACTIVE_WORD_IDS", value: selector.reorganizedWordIds } )
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

    render() {
      const { app } = this.props
      const { searching } = app
      const {
        wordCanBeAdded: isNewWord,
        currentWord,
        shallShowWordPanel,
      } = selector
      const note = notNil( currentWord ) ? currentWord.note : null
      const { tabIndex } = this.state
      return (
        <TopbarLayout isShowingCurrentWordPanel={true} enableCurrentWordPanelClose={false}>
        </TopbarLayout>
      )
    }
  }
)
