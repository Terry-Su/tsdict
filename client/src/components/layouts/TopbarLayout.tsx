import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import TopBar from "../TopBar"
import { TOP_BAR_HEIGHT } from "../../constants/numbers"

export default mapStateAndStyle( {
  main: {
    height   : `calc( 100% - ${TOP_BAR_HEIGHT}px )`,
    boxSizing: 'border-box',
    padding  : '10px',
    overflow : 'auto'
  }
} )(
  class WithTopbar extends Component<any, any> {
    render() {
      const { classes: c } = this.props
      return (
        <div className={c.w_100__h_100}>
          <TopBar />
          <div className={c.main}>
          { this.props.children }
          </div>
        </div>
      )
    }
  }
)
