import React, { Component } from 'react'
import styled from 'styled-components'

import { ReviewLevel } from '@/__typings__/review'
import { LongPress } from '@/componentsPure/highOrder/withLongPress'
import { Actions, Selectors, States } from '@/utils/decorators'

import Star from './Star'

const MAX_DEGREE: ReviewLevel = 10
const STARS_COUNT = MAX_DEGREE / 2
let starsCountArray = Array.apply( 0, new Array( STARS_COUNT ) )

interface Props {
  degree?: ReviewLevel
  onChange?: Function
}

function getStartCount( number: number, degree: ReviewLevel ) {
  if ( degree == null ) { return 0 }
  const target = 2 * number
  if ( target <= degree ) {
    return 2
  }
  if ( target === degree + 1 ) {
    return 1
  }
  return 0
}


export default class Degree extends Component<Props> {
  onStarLeftClick = number => {
    const { onChange } = this.props
    const degree = number * 2 - 1
    onChange && onChange( degree )
  }

  onStarRightClick = number => {
    const { onChange } = this.props
    const degree = number * 2
    onChange && onChange( degree )
  }

  onLongPress = () => {
    const { onChange } = this.props
    onChange && onChange( 1 )
  }

  render() {
    const { degree } = this.props
    return (
      <LongPress onLongPress={this.onLongPress}>
        <StyledRoot>
          {starsCountArray.map( ( value, index ) => (
            <Star
              key={index}
              count={getStartCount( index + 1, degree )}
              onLeftClick={() => this.onStarLeftClick( index + 1 )}
              onRightClick={() => this.onStarRightClick( index + 1 )}
            />
          ) )}
        </StyledRoot>
      </LongPress>
    )
  }
}

const StyledRoot = styled.span`
  display: inline-block;
  width: 125px;
  svg {
    cursor: pointer;
  }
`



