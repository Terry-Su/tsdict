import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

@Actions( 'review', 'enableReviewModeRandom', 'SET_REVIEW_MODE_NONE' )
@Actions( 'tree', 'TOOGLE_TREE_PANEL' )
export default class Toolbar extends Component<Props> {
  TOOGLE_TREE_PANEL?: Function
  enableReviewModeRandom?: Function
  SET_REVIEW_MODE_NONE?: Function
  render() {
    return (
      <StyledRoot>
        <button onClick={ () => this.TOOGLE_TREE_PANEL() }>Tree Panel</button>
        <button onClick={ () => this.enableReviewModeRandom() }>Random Review Mode</button>
        <button onClick={ () => this.SET_REVIEW_MODE_NONE() }>Exit Review Mode</button>
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