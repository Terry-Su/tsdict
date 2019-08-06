import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

@States( "app", "searchingWordName" )
@Actions( "app", "SET_PRONUNCIATION_PLAYER" )
export default class Pronunciation extends Component<Props> {
  searchingWordName?: string
  SET_PRONUNCIATION_PLAYER?: Function

  audioRef: any = React.createRef()

  get cambridgeUrls(): string[] {
    const { searchingWordName } = this
    const tmp = `${this.searchingWordName}_____`
    const a = tmp.substring( 0, 1 )
    const b = tmp.substring( 0, 3 )
    const c = tmp.substring( 0, 5 )
    const url = `https://dictionary.cambridge.org/us/media/english/us_pron/${ a }/${ b }/${ c }/${ searchingWordName }.mp3`
    return [
      url,
    ]
  }

  get youdaoUrls(): string[] {
    const { searchingWordName } = this
    const url = `http://dict.youdao.com/dictvoice?audio=${searchingWordName}&type=2` 
    return [ url ]
  }

  componentDidMount() {
    this.SET_PRONUNCIATION_PLAYER( this.audioRef.current )
  }

  handleHoverButton = () => {
    if ( this.audioRef && this.audioRef.current ) {
      this.audioRef.current.load()
      this.audioRef.current.play()
    }
  }

  render() {
    return (
      <StyledRoot>
        <button onClick={ this.handleHoverButton } onMouseOver={ this.handleHoverButton }>Speak</button>
        <audio ref={this.audioRef} controls>
            {
              this.youdaoUrls.map( ( url, index ) => <source key={ index } src={ url } /> )
            }
            {
              this.cambridgeUrls.map( ( url, index ) => <source key={ index } src={ url } /> )
            }
            {`Sorry, your browser doesn't support embedded videos.`}
        </audio>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
>audio {
  display: none;
}
`