import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Input from "@material-ui/core/Input"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import TheAddButton from "./TheAddButton"
import selector from "../../../selectors"
import { DictDataWord } from "../../../../../shared/__typings__/DictData"
import DownSuggest from "../../materials/DownSuggest"
import DownSuggestContainer from "../../materials/DownSuggestContainer"

export default mapStateAndStyle( {} )(
  class TheSearch extends Component<any, any> {
    state = {
      isTyping: false
    }
    get filteredWords(): string[] {
      const { app, core } = this.props
      const { searching } = app
      const { words } = core
      return words
        .filter(
          ( { name } ): DictDataWord =>
            searching.trim() !== "" && name.startsWith( searching )
        )
        .map( ( word: DictDataWord ) => {
          return word.name
        } )
        .sort( ( a: string, b: string ) => {
          return a.length > b.length ? 1 : -1
        } )
    }

    onSearchChange = e => {
      const { value } = e.target
      const { dispatch } = this.props

      dispatch( { type: "app/UPDATE_SEARCHING", value } )
      this.setState( { isTyping: true } )
    }

    render() {
      const { app, classes: c } = this.props
      const { searching } = app
      const { wordNames } = selector
      const { dispatch } = this.props
      const { isTyping } = this.state
      return (
        <section>
          <section>
            <DownSuggestContainer>
              <Input
                type="text"
                onChange={this.onSearchChange}
                value={searching}
              />
              {isTyping && (
                <DownSuggest
                  text={searching}
                  texts={wordNames}
                  onItemClick={name => {
                    dispatch( { type: "app/UPDATE_SEARCHING", value: name } )
                    this.setState( { isTyping: false } )
                  }}
                />
              )}
            </DownSuggestContainer>
            &nbsp;&nbsp;
            <TheAddButton />
          </section>
        </section>
      )
    }
  }
)
