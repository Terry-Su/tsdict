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
    state = { ...new State() }

    onClick = () => {
      fetchCurrentPhoneticSymbol().then( ( data: string[] ) => data && this.dispatch( { type: 'core/UPDATE_WORD_P', word: selector.currentWord, p: [ data[ 0 ] ] } ) )
    }

    render() {
      const { classes: c, dispatch } = this.props
      const { p = [] } = selector.currentWord
      return (
        <div>
          {p.length === 0 ? (
            <Button onClick={this.onClick}>🎵</Button>
          ) : (
            p.map( ( html, index ) => <span key={index} >
            <span dangerouslySetInnerHTML={{ __html: html.replace( /<img.+>/, '' ) }}></span>
            &nbsp;&nbsp;
            </span> )
          )}
        </div>
      )
    }
  }
)
