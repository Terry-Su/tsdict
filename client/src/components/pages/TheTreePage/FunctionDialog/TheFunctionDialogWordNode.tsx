import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import NewListItem from "./NewListItem"
import DialogTitle from "@material-ui/core/DialogTitle"




export default mapStateAndStyle( {
  list: {
    minWidth: '300px'
  }
} )(
  class TheFunctionDialogWordNode extends Component<{
    wordId: string,
    open: boolean,
    onClose: any,

    classes: any
  }, any> {
    onDeleteClick = () => {
      console.log( this.props.wordId )
    }
    render() {
      const { classes: c, open, onClose } = this.props
      return (
        <Dialog open={ open } onClose={onClose}>
          <DialogTitle>Word</DialogTitle>
          <List className={ c.list }>
            <NewListItem>Rename</NewListItem>
            <NewListItem onClick={ this.onDeleteClick }>Delete</NewListItem>
          </List>
        </Dialog>
      )
    }
  }
)