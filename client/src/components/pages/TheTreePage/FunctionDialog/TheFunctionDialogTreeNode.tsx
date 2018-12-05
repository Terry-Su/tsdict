import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import NewListItem from "./NewListItem"
import { Tree } from "../../../../__typings__"
import DialogTitle from "@material-ui/core/DialogTitle"




export default mapStateAndStyle( {
  list: {
    minWidth: '300px'
  }
} )(
  class TheFunctionDialogTreeNode extends Component<{
    tree: Tree
    onClose: any
    open: boolean

    classes: any
  }, any> {
    onDeleteClick = () => {
      console.log( this.props.tree )
    }

    render() {
      const { classes: c, onClose, open }  = this.props
      return (
        <Dialog open={ open } onClose={ onClose }>
          <DialogTitle>Folder</DialogTitle>
          <List className={ c.list }>
            <NewListItem>Rename</NewListItem>
            <NewListItem onClick={ this.onDeleteClick }>Delete</NewListItem>
          </List>
        </Dialog>
      )
    }
  }
)