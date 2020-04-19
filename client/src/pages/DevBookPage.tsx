import React, { Component } from 'react'
import styled from 'styled-components'

import TreeSpec from '@/components/DevBook/TreeSpec'
import { Actions, Selectors, States } from '@/utils/decorators'
import VoiceReviewPanel from './HomePage/VoiceReviewPanel'

interface Props {
  
}

const CurrentComponent = 
// TreeSpec
VoiceReviewPanel

export default class DevBookPage extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        <CurrentComponent />
        { this.props.children }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
width: 100%;
height: 100%;
`