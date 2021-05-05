import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line no-unused-vars
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {

}

export default class Template extends React.Component<Props> {
  render () {
    return (
      <StyledRoot>
        Template
      </StyledRoot>
    )
  }
}

// eslint-disable-next-line no-unused-vars
const StyledRoot = styled.div``
