import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle( {
  entry: {
    display : 'inline-block',
    position: 'relative',
  }
} )(
  class DownSuggestContainer extends Component<any, any> {
    render() {
      const { children, classes: c, className = '' } = this.props
      return (
        <div className={`${ c.entry } ${className}`}>
         { children }
        </div>
      )
    }
  }
)