import React, { Component } from 'react'
import styled from 'styled-components'

import TreeSpec from '@/components/DevBook/TreeSpec'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default class DevBookPage extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        <TreeSpec />
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div``