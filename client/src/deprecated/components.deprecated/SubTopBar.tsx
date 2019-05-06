import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

class Style extends GlobalStyle {
  entry = {
    display   : "flex",
    alignItems: "center"
  }
  left = {
    flex          : 1,
    display       : "flex",
    justifyContent: "flex-start"
  }
  center = {
    flex          : 1,
    display       : "flex",
    justifyContent: "center",
    margin        : 0,
  }
  right = {
    flex          : 1,
    display       : "flex",
    justifyContent: "flex-end"
  }
}
class Props extends DefaultProps {
  left: any
  center: any
  right: any
}
class State {}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class SubTopBar extends BasicComponent<Props, State> {
    state = { ...new State() }
    render() {
      const { classes: c, dispatch,left, center, right, children } = this.props
      return (
        <div className={c.entry}>
          <div className={c.left} >{left}</div>
          <h2 className={c.center} >{center}</h2>
          <div className={c.right} >{right}</div>
          { children }
        </div>
      )
    }
  }
)
