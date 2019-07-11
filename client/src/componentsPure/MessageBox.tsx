import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  visible: boolean
}



export default class MessageBox extends Component<Props> {
  render() {
    const {
      visible,
      children,
    } = this.props
    return visible && ReactDOM.createPortal( <StyledModalRoot>
      <div className="box">
        { children }
      </div>
    </StyledModalRoot>, document.body )
  }
}

const StyledModalRoot = styled.div`
  box-sizing: border-box;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px 0 0 0;
  /* background: rgba( 0, 0, 0, 0.2 ); */

  >.box {
    position: relative;
    display: grid;
    place-items: center;
    width: 80%;
    height: 100px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12);
  }
`