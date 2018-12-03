import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import TopBar from "../TopBar"

export default mapStateAndStyle( {
  main: {
    boxSizing: 'border-box',
    padding  : '10px'
  }
} )(
  class WithTopbar extends Component<any, any> {
    render() {
      const { classes: c } = this.props
      return (
        <div >
          <TopBar />
          <div className={c.main}>
          { this.props.children }
          </div>
        </div>
      )
    }
  }
)
