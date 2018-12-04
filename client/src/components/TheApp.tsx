import React, { Component } from "react"
import TheHomePage from "./pages/TheHomePage/TheHomePage"
import TheTestingComponent from "./TheTestingComponent"
import { Route } from "dva/router"
import { HOME_ROUTE, SETTING, WORDS_ROUTE, TAGS } from "../constants/routes"
import TheWordsPage from "./pages/TheWordsPage"
import selector from "../selectors"
import Message from "./materials/Message"
import TheSettingPage from "./pages/TheSettingPage/TheSettingPage"
import TheTagsPage from "./pages/TheTagsPage"

const isTestingSingleComponent = !!TheTestingComponent

export default class TheApp extends Component<any, any> {
  render() {
    const { isShowingMessage, message, messageType } = selector.appState
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div>
        <Route exact path={HOME_ROUTE} component={TheHomePage} />
        <Route exact path={WORDS_ROUTE} component={TheWordsPage} />
        <Route exact path={SETTING} component={TheSettingPage} />
        <Route exact path={TAGS} component={TheTagsPage} />

        <Message type={messageType} open={isShowingMessage} message={message} />
      </div>
    )
  }
}
