import React, { Component } from 'react'
import styled from 'styled-components'

import MessageBox from '@/componentsPure/MessageBox'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

@States( 'message', 'visibleMessage', 'messageText' )
export default class Message extends Component<Props> {
  visibleMessage?: boolean
  messageText?: string

  render() {
    return (
      <MessageBox visible={this.visibleMessage}>
        { this.messageText }
      </MessageBox>
    )
  }
}

const StyledRoot = styled.div``