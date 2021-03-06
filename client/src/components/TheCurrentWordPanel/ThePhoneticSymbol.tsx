import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import selector from '@/selectors'
import { fetchCurrentPhoneticSymbol } from '@/services'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Button } from '@material-ui/core'

class Props extends DefaultProps {}
class State {}
class Style extends GlobalStyle {}

export default mapStateAndStyle<Props>( { ...new Style() } )(
  class ThePhoneticSymbol extends BasicComponent<Props, State> {
    audioRef: any = React.createRef()

    state = { ...new State() }

    get cambridgeUrls(): string[] {
      const {  name } = selector.currentWord
      const tmp = `${name}_____`
      const a = tmp.substring( 0, 1 )
      const b = tmp.substring( 0, 3 )
      const c = tmp.substring( 0, 5 )
      const url = `https://dictionary.cambridge.org/us/media/english/us_pron/${ a }/${ b }/${ c }/${ name }.mp3`
      return [
        url,
      ]
    }

    get possibleVoiceUrls(): string[] {
      const { name = "" } = selector.currentWord
      function template( string: string ) {
        return `http://media.merriam-webster.com/soundc11/${
          name[ 0 ]
        }/${string}.wav`
      }
      const reducedName = name.slice( 0, name.length - 1 )
      return [
        template( `${name}01` ),
        template( `${name}001` ),
        template( `${name}0001` ),
        template( `${reducedName}01` ),
        template( `${reducedName}02` ),
        template( `${reducedName}03` ),
        template( `${reducedName}04` ),
        template( `${reducedName}05` ),
        template( `${reducedName}001` ),
        template( `${reducedName}0001` ),
      ]
    }

    onClick = () => {
      fetchCurrentPhoneticSymbol().then(
        ( data: string[] ) => data &&
          this.dispatch( {
            type: "core/UPDATE_WORD_P",
            word: selector.currentWord,
            p   : [ data[ 0 ] ],
          } )
      )
    }

    onPronunceClick = () => {
      this.audioRef && this.audioRef.current && this.audioRef.current.play()
    }

    render() {
      if ( selector.currentWord == null ) {
        return null
      }

      const { classes: c, dispatch } = this.props
      const { p = [], name } = selector.currentWord
      const { possibleVoiceUrls } = this
      return (
        <div>
          <Button onClick={this.onPronunceClick}>🎤</Button>
          <audio ref={this.audioRef} controls style={{ display: 'none' }}>
            {/* {possibleVoiceUrls.map( ( url, index ) => (
              <source key={index} src={url} />
            ) )} */}

            {/* # Rule1: from oxford dictionary, England accent*/}
            {/* <source src={`https://s3.amazonaws.com/audio.oxforddictionaries.com/en/mp3/${name}_gb_1.mp3`} />
            <source src={`https://s3.amazonaws.com/audio.oxforddictionaries.com/en/mp3/x${name}_gb_1.mp3`} /> */}

            {/* # Rule2: from cambridge dictionary, American accent */}
            {
              this.cambridgeUrls.map( ( url, index ) => <source key={ index } src={ url } /> )
            }
            {`Sorry, your browser doesn't support embedded videos.`}
          </audio>
        </div>
      )
    }
  }
)
