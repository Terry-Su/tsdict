import React, { Component } from 'react'

import Degree from '@/components/Degree/Degree'
import withLongPress from '@/components/highOrder/withLongPress'
import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle( {
  entry: {
    display: 'inline-block'
  }
} )(
  class TheDegree extends Component<any, any> {
    onDegreeChange = degree => {
      const { currentWord: word } = selector
      notNil( word ) && this.props.dispatch( { type: 'core/UPDATE_WORD_DEGREE', word, value: degree } )
    }

    onLongPress = () => {
      const { currentWord: word } = selector
      notNil( word ) && this.props.dispatch( { type: 'core/UPDATE_WORD_DEGREE', word, value: 0 } )
    }

    render() {
      const { classes: c } = this.props
      const { currentWord: word }  = selector
      const degree = notNil( word ) ? word.degree : null
      return (
        notNil( word ) && <Degree className={ c.entry } degree={degree} onChange={ this.onDegreeChange } onLongPress={ this.onLongPress }/>
      )
    }
  }
)
