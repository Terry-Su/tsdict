import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { DictDataWordDegree } from '@shared/__typings__/DictData'

import Star from './Star'

const MAX_DEGREE: DictDataWordDegree = 10
const STARS_COUNT = MAX_DEGREE / 2
let starsCountArray = Array.apply( 0, new Array( STARS_COUNT ) )
export default mapStateAndStyle()(
  class Degree extends Component<
    {
      degree: DictDataWordDegree,
      onChange: Function
      classes: any
    },
    any
  > {

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

    render() {
      const { degree = 0, classes: c, onChange, ...other } = this.props
      return (
        <div className={ c.d_ib } >
          {starsCountArray.map( ( value, index ) => (
            <Star
              key={index}
              count={getStartCount( index + 1, degree )}
              onLeftClick={() => this.onStarLeftClick( index + 1 )}
              onRightClick={() => this.onStarRightClick( index + 1 )}
            />
          ) )}
        </div>
      )
    }
  }
)

function getStartCount( number: number, degree: DictDataWordDegree ) {
  const target = 2 * number
  if ( target <= degree ) {
    return 2
  }
  if ( target === degree + 1 ) {
    return 1
  }
  return 0
}
