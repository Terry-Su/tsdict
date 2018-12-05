import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import selector from "../../selectors"
import { CalcTree } from "../../models/tree"
import { Tree, TreeNode } from "../../__typings__"
import { isString, notNil } from "../../utils/lodash"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import FolderIcon from "@material-ui/icons/Folder"
import NotesIcon from "@material-ui/icons/Notes"
import ListItemText from "@material-ui/core/ListItemText"
import { routerRedux } from "dva/router"
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
      dispatch( { type: 'tree/UPDATE_CURRENT_ID', value: theTree.id } )
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
