import { Link } from 'dva/router'
import { mapValues } from 'lodash'
import React, { Component } from 'react'

import download from '@/assets/js/download'
import { TOP_BAR_HEIGHT } from '@/constants/numbers'
import { HOME_ROUTE, SETTING_ROUTE, TAGS_ROUTE, TREE_ROUTE, WORDS_ROUTE } from '@/constants/routes'
import models from '@/models'
import selector from '@/selectors'
import localStore from '@/store/localStore'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'

import { backup, pull, push, updateMedias } from '../services'
import Uploader from './Uploader/Uploader'

export default mapStateAndStyle( {
  entry: {
    maxHeight: `${TOP_BAR_HEIGHT}px`,
    minHeight: `${TOP_BAR_HEIGHT}px`
  },
  link: {
    fontSize      : "12px!important",
    textDecoration: "none!important",
    "& span"      : {
      fontSize: "12px!important",
      color   : "white!important"
    }
  },
  noLink: {
    textDecoration: "none!important",
    color         : "unset!important",
    "& span"      : {
      color: "unset!important"
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
      const fileName = `tsdict.json`
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
              const currentState = selector.state[ name ]
              const targetState = data[ name ]

              dispatch( {
                type : `${name}/UPDATE_STATE`,
                value: notNil( targetState ) ?
                  {
                      ...currentState,
                      ...targetState
                    } :
                  selector.state[ name ]
              } )
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

    onUpdateMediaClick = () => {
      const { dispatch } = this.props
      updateMedias()
        .then( words => {
          dispatch( { type: "core/UPDATE_WORDS", value: words } )
        } )
        .then( () => dispatch( { type: "app/SHOW_UPDATE_MEDIA_SUCCESS" } ) )
        .catch( () => dispatch( { type: "app/SHOW_UPDATE_MEDIA_FAIL" } ) )
    }

    onLinkClick = () => {
      this.props.dispatch( { type: "app/HIDE_CURRENT_WORD_PANEL" } )
    }

    render() {
      const { anchorEl } = this.state
      const { classes: c } = this.props

      return (
        <AppBar position="static" className={c.entry}>
          <Toolbar>
            {/* Buttons */}
            <Link to={HOME_ROUTE} className={c.link} onClick={this.onLinkClick}>
              <IconButton>Home</IconButton>
            </Link>
            <Link
              to={WORDS_ROUTE}
              className={c.link}
              onClick={this.onLinkClick}
            >
              <IconButton>Words</IconButton>
            </Link>
            <Link to={TREE_ROUTE} className={c.link} onClick={this.onLinkClick}>
              <IconButton>Tree</IconButton>
            </Link>
            {/* <Link to={TAGS_ROUTE} className={c.link} onClick={this.onLinkClick}>
              <IconButton>Tag</IconButton>
            </Link> */}
            <Link
              to={SETTING_ROUTE}
              className={c.link}
              onClick={this.onLinkClick}
            >
              <IconButton>Setting</IconButton>
            </Link>

            <Menu
              anchorEl={anchorEl}
              open={Boolean( anchorEl )}
              onClose={this.handleClose}
            >
              <Link
                className={c.noLink}
                to={TAGS_ROUTE}
                onClick={this.onLinkClick}
              >
                <MenuItem>Tag</MenuItem>
              </Link>
              <MenuItem onClick={this.onExportClick}>Export</MenuItem>

              <div style={{ position: "relative" }}>
                <MenuItem>Import</MenuItem>
                <Uploader onChange={this.onUploadChange} />
              </div>
              <MenuItem onClick={this.onBackupClick}>Backup</MenuItem>
              <MenuItem onClick={this.onUpdateMediaClick}>
                Update Media
              </MenuItem>
              <MenuItem onClick={this.onPullClick}>Pull</MenuItem>

              <MenuItem onClick={this.onPushClick}>Push</MenuItem>
              {/* <MenuItem onClick={this.handleClose}></MenuItem> */}
            </Menu>
            <IconButton
              className={c.link}
              color="inherit"
              onClick={this.handleClick}
            >
              More
            </IconButton>
          </Toolbar>
        </AppBar>
      )
    }
  }
)
