import React, { Component } from 'react'

import { AppState } from '@/models/app'
import { CoreState } from '@/models/core'
import { SettingState } from '@/models/setting'
import { TagPageState } from '@/models/tagPage'
import { TreePageState } from '@/models/treePage'
import { WordPageState } from '@/models/wordPage'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export class DefaultProps {
  classes: any
  dispatch: Function
}

export default class BasicComponent<P extends {
  classes?: any
  dispatch?: Function
  core?: CoreState
  app?: AppState
  setting?: SettingState
  tagPage?: TagPageState
  treePage?: TreePageState
  wordPage?: WordPageState
} = {
  classes?: any
  dispatch?: Function
  core?: CoreState
  app?: AppState
  setting?: SettingState
  tagPage?: TagPageState
  treePage?: TreePageState
  wordPage?: WordPageState
}, S={}, SS=any> extends Component<P, S, SS> {
  get dispatch(): Function {
    return this.props.dispatch
  }
}