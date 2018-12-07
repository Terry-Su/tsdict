import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'


class State {
  value: string
}

export default mapStateAndStyle()(
  class TheRenameDialog extends Component<{
    defaultValue: string
    open: boolean
    onClose: any
    onSubmit: Function
  }, any> {
    state = new State()

    onConfirmClick = () => {
      const { onClose, onSubmit } = this.props
      const { value } = this.state
      onClose && onClose()
      onSubmit && onSubmit( value )
    }

    render() {
      const { onClose, open, defaultValue } = this.props
      const { value } = this.state
      return (
        <Dialog
          open={open}
          onClose={ onClose }
        >
          <DialogTitle>New Name</DialogTitle>
          <DialogContent>
            <Input defaultValue={ defaultValue } onChange={ e => this.setState( { value: e.target.value } ) }/>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color="primary" onClick={this.onConfirmClick}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
)



