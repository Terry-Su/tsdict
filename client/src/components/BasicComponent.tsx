import React, { Component } from 'react'

import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export class DefaultProps {
  classes: any
  dispatch: Function
}

export default class BasicComponent<P extends {
  classes?: any
  dispatch?: Function
} = {
  classes?: any
  dispatch?: Function
}, S={}, SS=any> extends Component<P, S, SS> {}