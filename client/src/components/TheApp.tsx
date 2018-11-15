import React, { Component } from "react"
import TheHomePage from "./pages/TheHomePage"
import TheTestingComponent from "./TheTestingComponent"
import { Route } from 'dva/router'
import TheEditOnlineLinksPage from "./pages/TheEditOnlineLinksPage"
import { HOME_ROUTE, EDIT_ONLINE_LINKS_ROUTE } from "../constants/routes"

const isTestingSingleComponent = false

export default class TheApp extends Component<any, any> {
  

  render() {
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div> 
        <Route exact path={ HOME_ROUTE } component={ TheHomePage } />
        <Route exact path={ EDIT_ONLINE_LINKS_ROUTE } component={ TheEditOnlineLinksPage } />
      </div>
    )
  }
}
