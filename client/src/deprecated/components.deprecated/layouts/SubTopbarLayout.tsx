import React, { Component } from 'react'

import { SUB_TOP_BAR_HEIGHT } from '@/constants/numbers'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

import BasicComponent, { DefaultProps } from '../BasicComponent'

class Props extends DefaultProps {
  topbar: any
  mainRef:any
}

export default mapStateAndStyle( {
  main: {
    height   : `calc( 100% - ${SUB_TOP_BAR_HEIGHT}px )`,
    boxSizing: "border-box",
    overflow : "auto"
  }
} )(
  class SubTopbarLayout extends BasicComponent<Props> {
    render() {
      const { classes: c, topbar, mainRef } = this.props
      return (
        <div className={c.w_100__h_100}>
          <div className={c.topbar}>{topbar}</div>
          <div className={c.main} ref={ mainRef }>{this.props.children}</div>
        </div>
      )
    }
  }
)
