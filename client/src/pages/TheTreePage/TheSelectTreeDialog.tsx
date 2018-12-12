import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import SelectTree from '@/components/SelectTree/SelectTree'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Dialog } from '@material-ui/core'

class Props extends DefaultProps {}
class State {}
class Style extends GlobalStyle {
  entry = {
    margin: 0,

    "&>div>div": {
      width    : "80%",
      maxWidth : "100%",
      height   : '80%',
      maxHeight: "100%",
      margin   : 0
    }
  }
}

export default mapStateAndStyle<Props>( new Style() )(
  class TheSelectTreeDialog extends BasicComponent<Props, State> {
    state = new State()

    onClose = () => {
      this.dispatch( { type: 'treePageSelectTreeDialog/CLOSE' } )
    }

    onConfirm = ( selectedId: string ) => {
      const { callbackAfterConfirmed } = selector.treePageSelectTreeDialogState
      callbackAfterConfirmed && callbackAfterConfirmed( selectedId )
      this.dispatch( { type: 'treePageSelectTreeDialog/CLOSE' } )
    }

    onCancel = () => {
      this.dispatch( { type: 'treePageSelectTreeDialog/CLOSE' } )
    }

    render() {
      const { classes: c, dispatch } = this.props
      const { isOpen } = selector.treePageSelectTreeDialogState
      return (
        <Dialog className={c.entry} open={isOpen} onClose={this.onClose}>
          <SelectTree onConfirm={this.onConfirm} onCancel={this.onCancel}></SelectTree>
        </Dialog>
      )
    }
  }
)
