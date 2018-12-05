import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import NewListItem from "./NewListItem"
import DialogTitle from "@material-ui/core/DialogTitle"
import selector from "../../../../selectors"




export default mapStateAndStyle( {
  list: {
    minWidth: '300px'
  }
} )(
  class TheFunctionDialogWordNode extends Component<{
    wordId: string,
    open: boolean,
    onClose: any,
    showRenameDialog: Function

    classes: any,
    dispatch: Function
  }, any> {
    onDeleteClick = () => {
      console.log( this.props.wordId )
    }

    onRenameClick = () => {
      const { showRenameDialog, wordId, onClose } = this.props
      onClose()
      showRenameDialog( wordId )
    }

    render() {
      const { classes: c, open, onClose, dispatch, wordId } = this.props
      const word = selector.getWordByWordId( wordId )
      return (
        <Dialog open={ open } onClose={onClose}>
          <DialogTitle>Word</DialogTitle>
          <List className={ c.list }>
            <NewListItem onClick={ this.onRenameClick }>Rename</NewListItem>
            <NewListItem onClick={ this.onDeleteClick }>Delete</NewListItem>
          </List>
        </Dialog>
      )
    }
  }
)