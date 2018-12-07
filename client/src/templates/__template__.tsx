import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

class Style extends GlobalStyle {}
class State {}
class Props extends DefaultProps {}

export default mapStateAndStyle<Props>( new Style() )(
  class Template extends BasicComponent<Props, State > {
    state = new State()
    render() {
      const { classes: c, dispatch } = this.props
      return (
        <div>
          
        </div>
      )
    }
  }
)