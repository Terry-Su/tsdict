import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import ListItem from "@material-ui/core/ListItem"
import withLongPress from "../../../highOrder/withLongPress"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import FolderIcon from "@material-ui/icons/Folder"
import ListItemText from "@material-ui/core/ListItemText"

const DecoratedListItem: any = withLongPress( ListItem )

export default mapStateAndStyle()(
  class TreeItem extends Component<any, any> {
    onClick = () => {
      const { tree, dispatch } = this.props
      dispatch( { type: 'treePage/UPDATE_CURRENT_TREE_ID', value: tree.id } )
    }

    onLongPress = () => {
      const { dispatch, tree } = this.props
      dispatch( { type: 'treePage/UPDATE_LONG_PRESSING_TREE', value: tree } )
      dispatch( { type: 'treePage/SHOW_TREE_FUNCTION_DIALOG' } )
    }

    render() {
      const { tree } = this.props
      return (
        <DecoratedListItem button onClick={ this.onClick } onLongPress={ this.onLongPress }>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ tree.name } />
        </DecoratedListItem>
      )
    }
  }
)