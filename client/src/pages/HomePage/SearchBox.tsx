import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  SET_SEARCHING_WORD_NAME?: Function
}

@States( 'app', 'searchingWordName' )
@Actions( 'app', 'SET_SEARCHING_WORD_NAME' )
export default class SearchBox extends Component<Props> {
  searchingWordName?: string
  SET_SEARCHING_WORD_NAME?: Function

  state = {
    valueProxy: this.searchingWordName,
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.searchingWordName !== this.searchingWordName && this.searchingWordName !== this.state.valueProxy ) {
      this.setState( { valueProxy: this.searchingWordName } )
    }
  }

  debouncedSetSearchingWordName = debounce( value => this.SET_SEARCHING_WORD_NAME( value ), 400 )

  onChange =  ( event ) => {
    this.setState( { valueProxy: event.target.value }, () => {
      this.debouncedSetSearchingWordName( this.state.valueProxy )
    } )
  }

  render() {
    return (
      <StyledRoot>
        <input value={ this.state.valueProxy } onChange={ this.onChange }/>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  >input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    text-align: center;
    font-size:20px;
  }
`