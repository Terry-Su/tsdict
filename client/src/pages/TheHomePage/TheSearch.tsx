import React, { Component } from 'react'

import DownSuggest from '@/components/DownSuggest/DownSuggest'
import DownSuggestContainer from '@/components/DownSuggest/DownSuggestContainer'
import { createWord } from '@/models/core'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { DictDataWord } from '@shared/__typings__/DictData'

export default mapStateAndStyle( {} )(
  class TheSearch extends Component<any, any> {
    searchInputRef = React.createRef()
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

    componentDidMount() {
      const { wordIsAdded } = selector
      if ( !wordIsAdded ) {
        this.setState( { isTyping: true } )
      }
    }

    onSearchChange = e => {
      const { value } = e.target
      const { dispatch } = this.props

      dispatch( { type: "app/UPDATE_SEARCHING", value } )
      this.setState( { isTyping: true } )
    }

    onSearchBlur = ( { currentTarget } ) => {
      this.setState( { isTyping: false } )
    }

    onSearchFocus = () => {
      const { searching } = selector.appState
      searching.trim() === '' && this.setState( { isTyping: true } )
    }

    onAddClick = () => {
      const { app, dispatch } = this.props
      const { searching: name } = app
      const { wordCanBeAdded } = selector
      wordCanBeAdded &&
        dispatch( { type: "core/ADD_WORD", value: createWord( name ) } )
      this.setState( { isTyping: false } )
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
                autoFocus
                inputRef={this.searchInputRef}
                type="text"
                onChange={this.onSearchChange}
                onBlur={this.onSearchBlur}
                onFocus={this.onSearchFocus}
                value={searching}
              />
              {isTyping && (
                <DownSuggest
                  text={searching}
                  texts={wordNames}
                  onItemMouseDown={name => {
                    dispatch( { type: "app/UPDATE_SEARCHING", value: name } )
                    this.setState( { isTyping: false } )
                  }}
                  enableTextsWhenEmpty
                />
              )}
            </DownSuggestContainer>
            &nbsp;&nbsp;
            {selector.wordCanBeAdded && (
              <Button variant="contained" onClick={this.onAddClick}>
                Add
              </Button>
            )}
          </section>
        </section>
      )
    }
  }
)
