import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import selector from "../../../selectors"
import FunctionDialog from "../../Dialog/FunctionDialog"

export default mapStateAndStyle()(
  class TheTreeFunctionDialogue extends Component<any, any> {
    close = () => {
      this.props.dispatch( { type: 'treePage/HIDE_TREE_FUNCTION_DIALOG' } )
    }
    render() {
      const { dispatch } = this.props
      const { isTreeFunctionDialogOpen, longPressingTree: tree } = selector.treePageState
      return (
        <FunctionDialog
          open={isTreeFunctionDialogOpen}
          data={{
            items: [
              {
                label  : "Rename",
                onClick: () => {
                  this.close()
                  dispatch( { type: 'treePage/UPDATE_RENAMING_NAME', value: tree.name } )
                  dispatch( { type: 'treePage/SHOW_RENAME_DIALOG' } )
                  dispatch( { type : 'treePage/UPDATE_CALLBACK_AFTER_RENAMED', value: ( newName: string ) => {
                    dispatch( { type: 'core/UPDATE_TREE_NAME', tree, newName } )
                  } } )
                }
              },
              {
                label  : "Delete",
                onClick: () => {
                  this.close()
                  dispatch( { type: 'treePage/REMOVE_TREE', tree } )
                }
              }
            ]
          }}
          onClose={this.close}
        />
      )
    }
  }
)
