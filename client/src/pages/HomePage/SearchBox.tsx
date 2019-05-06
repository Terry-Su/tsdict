import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  SET_SEARCHING_WORD_NAME?: Function
}

@Actions( 'app', 'SET_SEARCHING_WORD_NAME' )
export default class SearchBox extends Component<Props> {
  searchingWordName?: string
  SET_SEARCHING_WORD_NAME?: Function

  onChange = ( event ) => {
    // this.SET_SEARCHING_WORD_NAME( event.target.value )
    // console.log( this.props )
    this.props.SET_SEARCHING_WORD_NAME( event.target.value )
  }
  render() {
    console.log( 'rendered' )
    return (
      <StyledRoot>
        <input defaultValue="test" onChange={ this.onChange }/>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  >input {
    width: 100%;
    height: 30px;
  }
`