import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import TopBar from "../TopBar"

export default mapStateAndStyle()(
  class WithTopbar extends Component<any, any> {
    render() {
      return (
        <div>
          <TopBar />
          { this.props.children }
        </div>
      )
    }
  }
)
