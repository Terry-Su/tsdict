import React, { Component } from "react"
import mapStateAndStyle from "../utils/mapStateAndStyle"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

export default mapStateAndStyle()(
  class TheTopBar extends Component<any, any> {
    state = {
      anchorEl: null
    }
  
    handleClick = event => {
      this.setState( { anchorEl: event.currentTarget } )
    }
  
    handleClose = () => {
      this.setState( { anchorEl: null } )
    }

    render() {
      const { anchorEl } = this.state

      return (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleClick}
            >
              Menu
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean( anchorEl )}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Item1</MenuItem>
              <MenuItem onClick={this.handleClose}>Item2</MenuItem>
              <MenuItem onClick={this.handleClose}>Item3</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )
    }
  }
)
