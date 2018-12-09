import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import BasicComponent, { DefaultProps } from '../BasicComponent'
import Input from '../Input/Input'

class Props extends DefaultProps {
  defaultValue: string
  open: boolean

  onClose: any
  onSubmit: Function
}

class State {
  value: string
}

export default mapStateAndStyle()(
  class TheRenameDialog extends BasicComponent<Props> {
    state = new State()

    onConfirmClick = () => {
      const { onClose, onSubmit } = this.props
      const { value } = this.state
      onClose && onClose()
      onSubmit && onSubmit( value )
    }

    render() {
      const { onClose, open, defaultValue } = this.props
      return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>New Name</DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              defaultValue={defaultValue}
              onChange={e => this.setState( { value: e.target.value } )}
              enableClear
              onClearMouseDown={ () => this.setState( { value: '' } ) }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onConfirmClick}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
)
