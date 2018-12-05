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
import { Tree, TreeNode } from "../../../__typings__"
import TheRenameDialog from "./FunctionDialog/TheRenameDialog"

class State {
  isAddDialogOpen: boolean = false
  isTreeNodeDialogOpen: boolean = false
  focusTreeNode: Tree
  isWordNodeDialogOpen: boolean = false
  focusWordId: string
  isRenameDialogOpen: boolean = false
  renamingName: string = ""
  treeNodeOfRenameDialog: TreeNode
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

    showRenameDialog = ( node: TreeNode ) => {
      let name
      if ( isString( node ) ) {
        name = selector.getWordByWordId( node ).name
      }
      if ( isPlainObject( node  ) ) {
        name = ( node as Tree ).name
      }
      this.setState( { 
        isRenameDialogOpen    : true, 
        renamingName          : name,
        treeNodeOfRenameDialog: node
      } )
    }

    onRenameSubmit = newName => {
      const { treeNodeOfRenameDialog: node } = this.state
      const { dispatch } = this.props
      if ( isString( node ) ) {
        const word = selector.getWordByWordId( node )
        dispatch( { type: 'mainData/UPDATE_WORD_NAME', word, value: newName } )
      }
      if ( isPlainObject( node ) ) {
        dispatch( { type: 'tree/UPDATE_TREE_NAME', tree: node, newName } )
      }
    }

    render() {
      const { classes: c } = this.props
      const {
        isAddDialogOpen,
        isTreeNodeDialogOpen,
        focusTreeNode,
        isWordNodeDialogOpen,
        focusWordId,
        isRenameDialogOpen,
        renamingName
      } = this.state
      const { currentTree, treeState } = selector
      const tree = notNil( currentTree ) ? currentTree : treeState.root
      return (
        <TopbarLayout>
          <TheTreeTopBar />
          <TreeView theTree={tree} onItemLongPress={this.onItemLongPress} />
          <Fab
            className={c.addButton}
            color="primary"
            onClick={this.onAddClick}
          >
            <AddIcon />
          </Fab>
          <TheAddDialog open={isAddDialogOpen} onClose={this.onDialogClose} />
          <TheFunctionDialogTreeNode
            theTree={focusTreeNode}
            open={isTreeNodeDialogOpen}
            onClose={() => this.setState( { isTreeNodeDialogOpen: false } )}
            showRenameDialog={ this.showRenameDialog }
          />
          <TheFunctionDialogWordNode
            wordId={focusWordId}
            open={isWordNodeDialogOpen}
            onClose={() => this.setState( { isWordNodeDialogOpen: false } )}
            showRenameDialog={ this.showRenameDialog }
          />
          <TheRenameDialog
            name={renamingName}
            open={isRenameDialogOpen}
            onClose={() => this.setState( { isRenameDialogOpen: false } )}
            onSubmit={this.onRenameSubmit}
          />
        </TopbarLayout>
      )
    }
  }
)
