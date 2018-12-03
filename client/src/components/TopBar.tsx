import React, { Component } from "react"
import mapStateAndStyle from "../utils/mapStateAndStyle"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Link } from "dva/router"
import {
  SETTING,
  HOME_ROUTE,
  WORDS_ROUTE
} from "../constants/routes"
import download from "../assets/js/download"
import localStore from "../store/localStore"
import Uploader from "./Uploader/Uploader"
import { backup, pull, push, cleanUseless } from "../services"
import selector from "../selectors"
import models from "../models/index"
import { notNil, mapValues } from "../utils/lodash"

export default mapStateAndStyle( {
  link: {
    fontSize      : "12px!important",
    textDecoration: "none!important",
    "& span"      : {
      fontSize: "12px!important",
      color   : "white!important"
    }
  }
} )(
  class TopBar extends Component<any, any> {
    state = {
      anchorEl: null
    }

    handleClick = event => {
      this.setState( { anchorEl: event.currentTarget } )
    }

    handleClose = () => {
      this.setState( { anchorEl: null } )
    }

    onExportClick = () => {
      const storeLocal = localStore.getStore()
      const str = JSON.stringify( storeLocal )
      const fileName = `tsdict2.json`
      download( str, fileName )
    }

    onUploadChange = text => {
      const d = JSON.parse( text )

      // check
      const valid = d != null

      if ( valid ) {
        localStore.setStore( d )
        window.location.reload()
      }
    }

    onBackupClick = () => {
      const { dispatch } = this.props
      backup( selector.storeData )
        .then( data => data && dispatch( { type: `app/SHOW_BACKUP_SUCCESS` } ) )
        .catch( () => dispatch( { type: `app/SHOW_BACKUP_FAIL` } ) )
    }

    onPullClick = () => {
      const { dispatch } = this.props
      pull( selector.storeData )
        .then( data => {
          notNil( data ) &&
            mapValues( models, ( { namespace: name } ) => {
              dispatch( { type: `${name}/UPDATE_STATE`, value: data[ name ] } )
              dispatch( { type: `app/SHOW_PULL_SUCCESS` } )
            } )
        } )
        .catch( () => dispatch( { type: `app/SHOW_PULL_FAIL` } ) )
    }

    onPushClick = () => {
      const { dispatch } = this.props
      push( selector.storeData )
        .then( data => {
          data && dispatch( { type: `app/SHOW_PUSH_SUCCESS` } )
        } )
        .catch( () => dispatch( { type: `app/SHOW_PUSH_FAIL` } ) )
    }

    onCleanClick = () => {
      const { dispatch } = this.props
      cleanUseless()
        .then( data => data && dispatch( { type: `app/SHOW_CLEAN_SUCCESS` } ) )
        .catch( () => dispatch( { type: `app/SHOW_CLEAN_FAIL` } ) )
    }
    render() {
      const { anchorEl } = this.state
      const { classes: c } = this.props

      return (
        <AppBar position="static">
          <Toolbar>
            {/* Buttons */}
            <Link to={HOME_ROUTE} className={c.link}>
              <IconButton>Home</IconButton>
            </Link>
            <Link to={WORDS_ROUTE} className={c.link}>
              <IconButton>Words</IconButton>
            </Link>

            <IconButton className={c.link} onClick={this.onPullClick}>
              Pull
            </IconButton>

            <IconButton className={c.link} onClick={this.onPushClick}>
              Push
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean( anchorEl )}
              onClose={this.handleClose}
            >
              <Link to={SETTING}>
                <MenuItem onClick={this.handleClose}>Setting</MenuItem>
              </Link>
              <MenuItem onClick={this.onExportClick}>Export</MenuItem>

              <div style={{ position: 'relative' }}>
                <MenuItem onClick={this.handleClose}>Import</MenuItem>
                <Uploader onChange={this.onUploadChange} />
              </div>
              <MenuItem onClick={this.onBackupClick}>Backup</MenuItem>
              <MenuItem onClick={this.onCleanClick}>Clean Media</MenuItem>
              {/* <MenuItem onClick={this.handleClose}></MenuItem> */}
            </Menu>
            <IconButton
              className={c.link}
              color="inherit"
              onClick={this.handleClick}
            >
              Menu
            </IconButton>
          </Toolbar>
        </AppBar>
      )
    }
  }
)
