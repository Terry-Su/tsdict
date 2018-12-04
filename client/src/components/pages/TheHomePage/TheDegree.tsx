import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Degree from "../../Degree/Degree"
import selector from "../../../selectors"
import withLongPress from "../../highOrder/withLongPress"

const DecoratedDegree: any = withLongPress( Degree )
export default mapStateAndStyle()(
  class TheDegree extends Component<any, any> {
    onDegreeChange = degree => {
      const { currentWord: word } = selector
      this.props.dispatch( { type: 'mainData/UPDATE_WORD_DEGREE', word, value: degree } )
    }

    onLongPress = () => {
      const { currentWord: word } = selector
      this.props.dispatch( { type: 'mainData/UPDATE_WORD_DEGREE', word, value: 0 } )
    }

    render() {
      const { degree } = selector.currentWord
      return (
        <DecoratedDegree degree={degree} onChange={ this.onDegreeChange } onLongPress={ this.onLongPress }/>
      )
    }
  }
)