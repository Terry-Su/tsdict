import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import TopbarLayout from "../../layouts/TopbarLayout"
import Fab from "@material-ui/core/Fab"
import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"
import TheAddDialog from "./TheAddDialog"
import selector from "../../../selectors"
import TreeView from "../../TreeView/TreeView"
import { notNil, isString, isPlainObject } from "../../../utils/lodash"
import TheTreeTopBar from "./TheTreeTopBar"
import TheFunctionDialogTreeNode from "./FunctionDialog/TheFunctionDialogTreeNode"
import TheFunctionDialogWordNode from "./FunctionDialog/TheFunctionDialogWordNode"
import { Tree } from "../../../__typings__"

class State {
  isAddDialogOpen: boolean = false
  isTreeNodeDialogOpen: boolean = false
  focusTreeNode: Tree
  isWordNodeDialogOpen: boolean = false
  focusWordId: string
}

export default mapStateAndStyle( {
  addButton: {
    position: "absolute",
    right   : "5%",
    bottom  : "5%"
  }
} )(
  class TheTreePage extends Component<any, State> {
    state = new State()

    onDialogClose = () => {
      this.setState( {
        isAddDialogOpen: false
      } )
    }

    onAddClick = () => {
      this.setState( {
        isAddDialogOpen: true
      } )
    }

    onItemLongPress = node => {
      if ( isString( node ) ) {
        this.setState( { isWordNodeDialogOpen: true, focusWordId: node } )
      }
      if ( isPlainObject( node ) ) {
        this.setState( { isTreeNodeDialogOpen: true, focusTreeNode: node } )
      }
    }

    render() {
      const { classes: c } = this.props
      const { isAddDialogOpen, isTreeNodeDialogOpen, focusTreeNode, isWordNodeDialogOpen, focusWordId } = this.state
      const { currentTree, treeState } = selector
      const tree = notNil( currentTree ) ?  currentTree : treeState.root 
      return (
        <TopbarLayout>
          <TheTreeTopBar />
          <TreeView theTree={ tree } onItemLongPress={ this.onItemLongPress }/>
          <Fab className={c.addButton} color="primary" onClick={this.onAddClick}>
            <AddIcon/>
          </Fab>
          <TheAddDialog open={isAddDialogOpen} onClose={this.onDialogClose} />
          <TheFunctionDialogTreeNode tree={focusTreeNode} open={ isTreeNodeDialogOpen } onClose={ () => this.setState( { isTreeNodeDialogOpen: false } ) } />
          <TheFunctionDialogWordNode wordId={focusWordId} open={ isWordNodeDialogOpen } onClose={ () => this.setState( { isWordNodeDialogOpen: false } ) } />
        </TopbarLayout>
      )
    }
  }
)
