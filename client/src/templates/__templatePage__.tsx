import React, { Component } from "react"
import mapStateAndStyle from "../utils/mapStateAndStyle"
import TopbarLayout from "../components/layouts/TopbarLayout"

export default mapStateAndStyle()(
  class TemplatePage extends Component<any, any> {
    render() {
      return (
        <TopbarLayout>
          TemplatePage
        </TopbarLayout>
      )
    }
  }
)