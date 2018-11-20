import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import Input from "@material-ui/core/Input"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import TheAddButton from "./TheAddButton"
import { getCanBeAdded, getCurrentWord } from "../../selectors"
import { DictDataWord } from "../../../../shared/__typings__/DictData"

export default mapStateAndStyle()(
  class TheSearch extends Component<any, any> {
    state = {
      isTyping: false
    }

    get currentWord(): DictDataWord {
      return getCurrentWord( this )
    }

    get filteredWords(): string[] {
      const { app, mainData } = this.props
      const { searching } = app
      const { words } = mainData
      return words.filter(  ( { name } ): DictDataWord => searching.trim() !== '' && name.startsWith( searching ) ).map( ( word: DictDataWord ) => {
        return word.name
      } ).sort( ( a: string, b: string ) => {
        return a.length > b.length ?
        1 : 
        -1
      } )
    }

    onSearchChange = e => {
      const { value } = e.target
      const { dispatch } = this.props

      dispatch( { type: "app/UPDATE_SEARCHING", value } )
      this.setState( { isTyping: true } )
    }

    onFilteredWordClick = name => {
      this.props.dispatch( { type: "app/UPDATE_SEARCHING", value: name } )
      this.setState( { isTyping: false } )
    }

    render() {
      const { app } = this.props
      const { searching } = app
      const { filteredWords } = this
      const { isTyping } = this.state
      return (
        <section>
          <section>
            <Input
              type="text"
              onChange={this.onSearchChange}
              value={searching}
            />
            &nbsp;&nbsp;
            <TheAddButton />
          </section>
          {
            isTyping && this.filteredWords.length > 0 && <List>
            {
              filteredWords.map( ( name, index ) => <ListItem button key={index} onClick={ () => this.onFilteredWordClick( name ) }>
                <ListItemText>{ name }</ListItemText>
              </ListItem> )
            }
          </List>
          }
        </section>
      )
    }
  }
)
