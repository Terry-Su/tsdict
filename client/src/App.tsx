import React, { Component } from 'react'
import styled from 'styled-components'

import HomePage from '@/pages/HomePage/HomePage'
import GlobalStyle from '@/styles/GlobalStyle'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default class Test extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        <HomePage />,
        <React.Fragment>
        <GlobalStyle />
        </React.Fragment>,
      </StyledRoot>
    )
      
      
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`