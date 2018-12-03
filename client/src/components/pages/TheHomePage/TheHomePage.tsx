import React, { Component } from "react"
import mapState from "../../../utils/mapState"
import OnlineLinks from "./TheOnlineLinks"
import Button from "@material-ui/core/Button"
import TopBar from "../../TopBar"
import TopbarLayout from "../../layouts/TopbarLayout"
import selector from "../../../selectors"
import { node } from "_@types_prop-types@15.5.6@@types/prop-types"
import { DictDataWord } from "../../../../../shared/__typings__/DictData"
import TextField from "@material-ui/core/TextField"
import Note, { NoteData } from "../../Note/Note"
import { updateMedia } from "../../../services"
import { notNil } from "../../../utils/lodash"
import TheSearch from "./TheSearch"
import TheOnlineLinks from "./TheOnlineLinks"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

export default mapState(
  class TheHomePage extends Component<any, any> {
    state = {
      tabIndex: 0
    }

    onAddNoteClick = () => {
      const { currentWord: word } = selector
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_ADD_ONE_NOTE",
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
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_REMOVE_ONE_NOTE",
        word,
        value: index
      } )
    }

    onNoteChange = async ( data: NoteData ) => {
      const { currentWord: word } = selector
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_NOTE",
        word,
        value: data
      } )

      const note = await updateMedia()
      notNil( note ) &&
        this.props.dispatch( {
          type : "mainData/UPDATE_WORD_NOTE",
          word,
          value: note
        } )
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
      const { note } = currentWord
      const { tabIndex } = this.state
      return (
        <TopbarLayout>
          <TheSearch />
          <br />
          {shallShowWordPanel && (
            <div>
              <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Note">
              </Tab>
              <Tab label="links">
              </Tab>
            </Tabs>
            <br />

                {
                  tabIndex === 0 && <Note data={note} onChange={this.onNoteChange} />
                }
                {
                  tabIndex === 1 && <TheOnlineLinks />
                }
            </div>
          )}


        </TopbarLayout>
      )
    }
  }
)
