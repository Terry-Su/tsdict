import React, { Component } from "react"
import mapState from "../../utils/mapState"
import OnlineLinks from "../OnlineLinks"
import Button from "@material-ui/core/Button"
import TopBar from "../TopBar"
import TopbarLayout from "../layouts/TopbarLayout"
import TheAddButton from "../TheHome/TheAddButton"
import { getCanBeAdded, getCurrentWord } from "../../selectors"
import { node } from "_@types_prop-types@15.5.6@@types/prop-types"
import { DictDataWord } from "../../../../shared/__typings__/DictData"
import TextField from "@material-ui/core/TextField"
import TheSearch from "../TheHome/TheSearch"

export default mapState(
  class TheHomePage extends Component<any, any> {
    get currentWord(): DictDataWord {
      return getCurrentWord( this )
    }

    onAddNoteClick = () => {
      const { currentWord: word } = this
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_ADD_ONE_NOTE",
        word,
        value: ""
      } )
    }
    onNoteChange = ( event, index ) => {
      const { value } = event.target
      const { currentWord: word } = this
      this.props.dispatch( {
        type: "mainData/UPDATE_WORD_UPDATE_ONE_NOTE",
        word,
        index,
        value
      } )
    }
    onRemoveNoteClick = ( index: number ) => {
      const { currentWord: word } = this
      this.props.dispatch( {
        type : "mainData/UPDATE_WORD_REMOVE_ONE_NOTE",
        word,
        value: index
      } )
    }

    search() {}

    render() {
      const { app } = this.props
      const { searching } = app
      const canBeAdded = getCanBeAdded( this )
      const { notes = [] } = this.currentWord
      return (
        <TopbarLayout>
          <TheSearch />
          <br />

          {searching.trim() !== "" && (
            <section>
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
              </section>

              <br />

              <h2>Online links</h2>
              <section>
                <OnlineLinks />
              </section>
            </section>
          )}
        </TopbarLayout>
      )
    }
  }
)
