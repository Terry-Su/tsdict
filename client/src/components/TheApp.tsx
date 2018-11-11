import React, { Component } from "react"
import TheHome from "./pages/TheHome"

const isTestingSingleComponent = true
const TestingComponent = TheHome

export default class TheApp extends Component<any, any> {
    render() {
      return <div>
        {
          isTestingSingleComponent ? <TestingComponent /> : <TheHome />
        }
      </div>
    }
}
