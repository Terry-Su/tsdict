import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

class Props extends DefaultProps {}
class State {}
class Style extends GlobalStyle {}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class Template extends BasicComponent<Props, State > {
    state = { ...new State() }
    render() {
      const { classes: c, dispatch } = this.props
      return (
        <div>
          
        </div>
      )
    }
  }
)