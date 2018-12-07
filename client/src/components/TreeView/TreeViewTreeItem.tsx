import { routerRedux } from 'dva/router'
import React, { Component } from 'react'

import { Tree } from '@/__typings__'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import FolderIcon from '@material-ui/icons/Folder'

const { push } = routerRedux

export default mapStateAndStyle()(
  class TreeViewItem extends Component<
    {
      theTree: Tree,
      dispatch: Function
    },
    any
  > {
    onClick = () => {
      const { theTree, dispatch } = this.props
      dispatch( { type: 'treePage/UPDATE_CURRENT_TREE_ID', value: theTree.id } )
    }

    render() {
      const { theTree } = this.props
      return (
        <ListItem button onClick={ this.onClick }>
          <ListItemAvatar>
            <Avatar>
            <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ theTree.name } />
        </ListItem>
      )
    }
  }
)
