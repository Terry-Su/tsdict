import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  src?: string
}

class State {
  isFullScreen: boolean = false
}
        
export default class IframeViewer extends Component<Props, State> {
  state = new State()
  onExitButtonClick = () => {
    this.setState( {
      isFullScreen: false,
    } )
  }

  onFullScreenButtonClick = () => {
    this.setState( {
      isFullScreen: true,
    } )
  }
  render() {
    const { isFullScreen } = this.state
    const { src = '' } = this.props
    return (
      <StyledRoot isFullScreen={isFullScreen}>
        {
            isFullScreen && <button onClick={ this.onExitButtonClick }>X</button>
          }
          {
            !isFullScreen && <button onClick={ this.onFullScreenButtonClick }>F</button>
          }
          <iframe src={src} frameBorder="0" />
      </StyledRoot>
    )
  }
}


const StyledRoot: any = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${ ( props: any ) => props.isFullScreen ? `
  position: fixed;
  left: 0;
  top: 0;
  ` : `` }

  >button {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  >iframe {
    width: 100%;
    height: 100%;
  }
`