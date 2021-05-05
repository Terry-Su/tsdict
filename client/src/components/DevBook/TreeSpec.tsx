import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default class TreeSpec extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        TreeSpec
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div``