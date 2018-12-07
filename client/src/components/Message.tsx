import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { IconButton, Snackbar, SnackbarContent, withStyles } from '@material-ui/core'

export default mapStateAndStyle( {
  content: {
    width : "100%",
    height: "100%",
  },
  success: {
    background: "#43a047"
  },
  error: {
    background: "#d32f2f"
  },
  warning: {
    background: "#ffa000"
  },
  info: {
    background: "#1976d2"
  }
} )(
  class Message extends Component<
    any,
    {
      open: boolean
      message: string
      type: string
      onClose: Function
    }
  > {

    onClose = () => {
      const { dispatch } = this.props
      dispatch( { type: 'app/HIDE_MESSAGE' } )
    }

    render() {
      const { open, onClose, message, type, classes: c } = this.props
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1200}
          onClose={ this.onClose  }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            classes={{
              root: c[ type ]
            }}
            message={
              <span>
                {message}
              </span>
            }
            action={[
              <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={ this.onClose }
                >
                  x
                </IconButton>
            ]}
          />
        </Snackbar>
      )
    }
  }
)
