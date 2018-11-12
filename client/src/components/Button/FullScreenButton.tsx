import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"


export default mapStateAndStyle( {
  entry: {
    display   : 'grid',
    placeItems: 'center',
    width     : '30px',
    height    : '30px',
    fontSize  : '12px',
    textAlign : 'center',
  }
} )(
  class ExitButton extends Component<any, any> {
    render() {
      const { classes: c, onClick } = this.props
      return (
        <button className={ c.entry } onClick={ e => onClick && onClick( e ) }>F</button>
      )
    }
  }
)
