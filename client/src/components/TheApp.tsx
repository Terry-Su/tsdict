import React, { Component } from "react"
import TheHomePage from "./pages/TheHomePage"
import TheTestingComponent from "./TheTestingComponent"
import { Route } from 'dva/router'
import TheOnlineLinksPage from "./pages/TheOnlineLinksPage"
import { HOME_ROUTE, EDIT_ONLINE_LINKS_ROUTE, WORDS_ROUTE } from "../constants/routes"
import TheWordsPage from "./pages/TheWordsPage"

const isTestingSingleComponent = false

export default class TheApp extends Component<any, any> {
  

  render() {
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div> 
        <Route exact path={ HOME_ROUTE } component={ TheHomePage } />
        <Route exact path={ WORDS_ROUTE } component={ TheWordsPage } />
        <Route exact path={ EDIT_ONLINE_LINKS_ROUTE } component={ TheOnlineLinksPage } />
      </div>
    )
  }
}
