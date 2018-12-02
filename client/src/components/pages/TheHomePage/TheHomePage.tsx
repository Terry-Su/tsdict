import React, { Component } from "react"
import mapState from "../../../utils/mapState"
import OnlineLinks from "../../OnlineLinks"
import Button from "@material-ui/core/Button"
import TopBar from "../../TopBar"
import TopbarLayout from "../../layouts/TopbarLayout"
import selector  from "../../../selectors"
import { node } from "_@types_prop-types@15.5.6@@types/prop-types"
import { DictDataWord } from "../../../../../shared/__typings__/DictData"
import TextField from "@material-ui/core/TextField"
import Note, { NoteData } from "../../Note/Note"
import { resolveNote } from "../../../services"
import { notNil } from "../../../utils/lodash"
import TheSearch from "./TheSearch"

export default mapState(
  class TheHomePage extends Component<any, any> {

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

    onAddPictureClick = () => {

    }

    onPictureUrlChange = () => {

    }

    onRemovePictureClick = () => {

    }
    
    onNoteChange = async ( data: NoteData ) => {
      const { currentWord: word } = selector
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_NOTE",
        word,
        value: data
      } )

      const note = await resolveNote()
      notNil( note ) && this.props.dispatch( {
        type : "mainData/UPDATE_WORD_NOTE",
        word,
        value: note
      } )
    }

    render() {
      const { app } = this.props
      const { searching } = app
      const { wordCanBeAdded: isNewWord, currentWord, shallShowWordPanel } = selector
      const { note } = currentWord
      const isOldWord = ! isNewWord
      return (
        <TopbarLayout>
          <TheSearch />
          <br />

{
  shallShowWordPanel && <Note data={ note } onChange={ this.onNoteChange } />
}

          {/* {
          searching.trim() !== "" && (
            <section>
              {
                // Add note
                // visible only when the word is added
                !wordCanBeAdded && (
                <section>
                  <h2>Note</h2>
                  {notes.map( ( note, index ) => (
                    <section key={index}>
                      <TextField
                        multiline
                        value={note}
                        onChange={event => this.onNoteChange( event, index )}
                      />
                      <Button
                        variant="contained"
                        onClick={() => this.onRemoveNoteClick( index )}
                      >
                        Remove
                      </Button>
                    </section>
                  ) )}
                  {
                    <Button variant="contained" onClick={this.onAddNoteClick}>
                      Add Note
                    </Button>
                  }

                  <br />
                  <br />
                  <br />

                  {[].map( ( picture, index ) => (
                    <section key={index}>
                      <TextField
                        multiline
                        value={'Url'}
                        onChange={event => this.onPictureUrlChange()}
                      />
                      <Button
                        variant="contained"
                        onClick={() => this.onRemovePictureClick()}
                      >
                        Remove
                      </Button>
                    </section>
                  ) )}
                  {
                    <Button variant="contained" onClick={this.onAddPictureClick}>
                      Add Picture
                    </Button>
                  }
                </section>
              )}
              <br />

              <h2>Online links</h2>
              <section>
                <OnlineLinks />
              </section>
            </section>
          )} */}
        </TopbarLayout>
      )
    }
  }
)
