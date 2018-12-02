import React, { Component } from "react"
import TheHomePage from "./pages/TheHomePage"
import TheTestingComponent from "./TheTestingComponent"
import { Route } from 'dva/router'
import TheOnlineLinksPage from "./pages/TheOnlineLinksPage"
import { HOME_ROUTE, EDIT_ONLINE_LINKS_ROUTE, WORDS_ROUTE } from "../constants/routes"
import TheWordsPage from "./pages/TheWordsPage"
import { cleanUseless } from "../services"
import selector from "../selectors"
import Message from "./material/Message"

const isTestingSingleComponent = !! TheTestingComponent

export default class TheApp extends Component<any, any> {
  render() {
    const { isShowingMessage, message, messageType } = selector.appState
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div> 
        <Route exact path={ HOME_ROUTE } component={ TheHomePage } />
        <Route exact path={ WORDS_ROUTE } component={ TheWordsPage } />
        <Route exact path={ EDIT_ONLINE_LINKS_ROUTE } component={ TheOnlineLinksPage } />

         <Message
          type={ messageType }
          open={ isShowingMessage }
          message={message}
        />
      </div>
    )
  }
}
