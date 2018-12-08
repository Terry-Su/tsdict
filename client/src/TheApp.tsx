import { Route } from 'dva/router'
import React, { Component } from 'react'

import Message from '@/components/Message'
import { HOME_ROUTE, SETTING_ROUTE, TAGS_ROUTE, TREE_ROUTE, WORDS_ROUTE } from '@/constants/routes'
import TheHomePage from '@/pages/TheHomePage/TheHomePage'
import TheSettingPage from '@/pages/TheSettingPage/TheSettingPage'
import TheTagPage from '@/pages/TheTagPage/TheTagPage'
import TheTreePage from '@/pages/TheTreePage/TheTreePage'
import TheWordPage from '@/pages/TheWordPage'
import selector from '@/selectors'
import TheTestingComponent from '@/TheTestingComponent'

const isTestingSingleComponent = !!TheTestingComponent

export default class TheApp extends Component<any, any> {
  render() {
    const { isShowingMessage, message, messageType } = selector.appState
    const { classes: c } = this.props
    return isTestingSingleComponent ? (
      <TheTestingComponent />
    ) : (
      <div style={{
        width : '100%',
        height: '100%',
      }} >
        <Route exact path={HOME_ROUTE} component={TheHomePage} />
        <Route exact path={WORDS_ROUTE} component={TheWordPage} />
        <Route exact path={TREE_ROUTE} component={TheTreePage} />
        <Route exact path={SETTING_ROUTE} component={TheSettingPage} />
        <Route exact path={TAGS_ROUTE} component={TheTagPage} />

        <Message type={messageType} open={isShowingMessage} message={message} />
      </div>
    )
  }
}
