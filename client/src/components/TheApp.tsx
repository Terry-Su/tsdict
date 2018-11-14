import React, { Component } from "react"
import TheHomePage from "./pages/TheHomePage"
import TheTestingComponent from "./TheTestingComponent"
import { Route } from 'dva/router'
import TheEditOnlineLinksPage from "./pages/TheEditOnlineLinksPage"
import { ROOT_ROUTE, EDIT_ONLINE_LINKS } from "../constants/routes"

const isTestingSingleComponent = false

export default class TheApp extends Component<any, any> {
  

  render() {
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div> 
        <Route path={ ROOT_ROUTE } component={ TheHomePage } />
        <Route path={ EDIT_ONLINE_LINKS } component={ TheEditOnlineLinksPage } />
      </div>
    )
  }
}
