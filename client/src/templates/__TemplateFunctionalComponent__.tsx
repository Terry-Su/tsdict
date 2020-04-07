import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

export default function Template( {}: Props ) {
  return (
    <StyledRoot>
      Template
    </StyledRoot>
  )
}

const StyledRoot = styled.div``