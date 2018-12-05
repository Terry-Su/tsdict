import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Degree from "../../Degree/Degree"
import selector from "../../../selectors"
import withLongPress from "../../highOrder/withLongPress"
import { notNil } from "../../../utils/lodash"

const DecoratedDegree: any = withLongPress( Degree )
export default mapStateAndStyle( {
  entry: {
    display: 'inline-block'
  }
} )(
  class TheDegree extends Component<any, any> {
    onDegreeChange = degree => {
      const { currentWord: word } = selector
      notNil( word ) && this.props.dispatch( { type: 'mainData/UPDATE_WORD_DEGREE', word, value: degree } )
    }

    onLongPress = () => {
      const { currentWord: word } = selector
      notNil( word ) && this.props.dispatch( { type: 'mainData/UPDATE_WORD_DEGREE', word, value: 0 } )
    }

    render() {
      const { classes: c } = this.props
      const { currentWord: word }  = selector
      const degree = notNil( word ) ? word.degree : null
      return (
        notNil( word ) && <DecoratedDegree className={ c.entry } degree={degree} onChange={ this.onDegreeChange } onLongPress={ this.onLongPress }/>
      )
    }
  }
)
