import React, { Component } from "react"
import TheHome from "./pages/TheHome"
import TheTestingComponent from "./TheTestingComponent"
const isTestingSingleComponent = true

export default class TheApp extends Component<any, any> {
    render() {
      return isTestingSingleComponent ? <TheTestingComponent /> : <TheHome />
    }
}
