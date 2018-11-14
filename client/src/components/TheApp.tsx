import React, { Component } from "react"
import TheHome from "./pages/TheHome"
import TheTestingComponent from "./TheTestingComponent"
import TheTopBar from "./TheTopBar"
import { Route } from 'dva/router'

const isTestingSingleComponent = false

export default class TheApp extends Component<any, any> {
  

  render() {
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div> 
        <TheTopBar />
        <Route path="/" component={ TheHome } />
      </div>
    )
  }
}
