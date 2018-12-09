import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import ClearIcon from '@material-ui/icons/Close'

class Props extends DefaultProps {}
class State {}
class Style extends GlobalStyle {
  entry = {
    ...this.d_ib,
    cursor: "pointer",
    color : "#dfdfdf"
  }
}

export default mapStateAndStyle<Props>( new Style() )(
  class ClearInputButton extends BasicComponent<Props, State> {
    state = new State()
    render() {
      const { classes: c, dispatch } = this.props
      return <ClearIcon className={c.entry} >
      
      </ClearIcon>
    }
  }
)
