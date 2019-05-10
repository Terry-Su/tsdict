import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTag } from '@/__typings__'
import { TypeWord } from '@/__typings__/word'
import InputSuggested, { SuggestItem } from '@/componentsPure/InputSuggested/InputSuggested'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  onConfirm: Function
}

class State {
  value: string = "";
}

@Actions( 'tag', 'ADD_TAG_BY_NAME', "ADD_TAG_WORD_ID" )
@Selectors( 'app', 'searchWordTagsCanBeAdded', "searchingWord" )
@Selectors( 'tag', 'getTagByName' )
export default class WordPanelInputSuggest extends Component<Props> {
  state = new State()

  searchingWord: TypeWord
  searchWordTagsCanBeAdded: TypeTag[]
  ADD_TAG_BY_NAME?: Function
  ADD_TAG_WORD_ID?: Function
  getTagByName?: Function

  get suggestItems(): SuggestItem[] {
    return this.searchWordTagsCanBeAdded.map( tag => tag.name )
  }

  handleChangeInputSuggested = ( value: string ) => {
    this.setState( { value } )
  };

  confirm = ( text: string ) => {
    if ( text.trim() !== '' ) {
      const potentialTag: TypeTag = this.getTagByName( text )
      let targetTag: TypeTag = potentialTag
      if ( potentialTag == null ) {
        this.ADD_TAG_BY_NAME( text )
        targetTag = this.getTagByName( text )
      }
      this.ADD_TAG_WORD_ID( targetTag, this.searchingWord.id )
    }
    const { onConfirm } = this.props
    onConfirm && onConfirm()
  }

  render() {
    return (
      <InputSuggested
        value={this.state.value}
        suggestItems={ this.suggestItems }
        onInputChange={this.handleChangeInputSuggested}
        onConfirm={ this.confirm }
      />
    )
  }
}
