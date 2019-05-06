import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default class Toolbar extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        <button>Save</button>
        <button>Setting</button>
        <button>Export</button>
        <button>Import</button>
        <button>Update Media</button>
        <button>Pull</button>
        <button>Push</button>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div``