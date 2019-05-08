import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

export type StarType = 0 | 1 | 2

const SVG_GRADIENT_ID = "half"

interface Props {
  onLeftClick?: Function
  onRightClick?: Function
  count?: number
}

export default class Star extends Component<Props> {
    onMouseDown = ( e ) => {
      const { target, clientX } = e
      const { left, right  } = target.getBoundingClientRect()
      const { onLeftClick, onRightClick } = this.props

      if ( clientX < ( left + right ) / 2 ) {
        onLeftClick && onLeftClick( e )
      } else {
        onRightClick && onRightClick( e )
      }
    }

    render() {
      const { count = 2 } = this.props
      let fill
      switch ( count ) {
        case 0:
          fill = "#d8d8d8"
          break
        case 1:
          fill = `url(#${SVG_GRADIENT_ID})`
          break
        case 2:
          fill = "#ffd055"
          break
      }

      return (
        <svg height="25" width="25" onMouseDown={ this.onMouseDown }>
          <linearGradient id={SVG_GRADIENT_ID} x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="#ffd055" />
            <stop offset="50%" stopColor="#d8d8d8" />
          </linearGradient>
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            fill={fill}
          />
        </svg>
      )
  }
}
