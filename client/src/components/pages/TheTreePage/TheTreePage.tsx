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
import TheRenameDialog from "./TheRenameDialog"
import TheTreeView from "./TheTreeView/TheTreeView"
import TheTreeFunctionDialogue from "./TheTreeFunctionDialogue"
import TheAddButton from "./TheAddButton"
import TheWordFunctionDialogue from "./TheWordFunctionDialogue"


export default mapStateAndStyle( {
  addButton: {
    position: "absolute",
    right   : "5%",
    bottom  : "5%"
  }
} )(
  class TheTreePage extends Component<any, any> {

    render() {
      return (
        <TopbarLayout>
          <TheTreeTopBar />
          <TheTreeView />
          <TheAddButton />

          <TheAddDialog />
          <TheTreeFunctionDialogue />
          <TheWordFunctionDialogue />
          <TheRenameDialog />
        </TopbarLayout>
      )
    }
  }
)
