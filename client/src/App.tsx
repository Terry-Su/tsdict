import React, { Component } from 'react'

import HomePage from '@/pages/HomePage/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default class Test extends Component<Props> {
  render() {
    return [
      <HomePage key={0}/>,
      // <React.Fragment key={1}>
      //   <GlobalStyle />
      // </React.Fragment>,
    ]
  }
}