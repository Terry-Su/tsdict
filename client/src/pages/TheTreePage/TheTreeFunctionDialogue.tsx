import React, { Component } from 'react'

import FunctionDialog from '@/components/Dialog/FunctionDialog'
import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle()(
  class TheTreeFunctionDialogue extends Component<any, any> {
    close = () => {
      this.props.dispatch( { type: "treePage/HIDE_TREE_FUNCTION_DIALOG" } )
    }
    render() {
      const { dispatch } = this.props
      const {
        isTreeFunctionDialogOpen,
        longPressingTree: tree
      } = selector.treePageState
      return (
        <FunctionDialog
          open={isTreeFunctionDialogOpen}
          data={{
            items: [
              {
                label  : "Move",
                onClick: () => {
                  dispatch( {
                    type:
                      "treePageSelectTreeDialog/UPDATE_CALLBACK_AFTER_CONFIRMED",
                    value: ( selectedTreeId: string ) => {
                     notNil( selectedTreeId ) && notNil( tree ) && dispatch( {
                        type: "core/MOVE_TREE_A_TO_B",
                        from: tree.id,
                        to  : selectedTreeId
                      } )
                    }
                  } )
                  dispatch( { type: "treePageSelectTreeDialog/OPEN" } )
                  dispatch( { type: "treePage/HIDE_TREE_FUNCTION_DIALOG" } )
                }
              },
              {
                label  : "Rename",
                onClick: () => {
                  this.close()
                  dispatch( {
                    type : "treePage/UPDATE_RENAMING_NAME",
                    value: tree.name
                  } )
                  dispatch( { type: "treePage/SHOW_RENAME_DIALOG" } )
                  dispatch( {
                    type : "treePage/UPDATE_CALLBACK_AFTER_RENAMED",
                    value: ( newName: string ) => {
                      dispatch( { type: "core/UPDATE_TREE_NAME", tree, newName } )
                    }
                  } )
                }
              },
              {
                label  : "Delete",
                onClick: () => {
                  this.close()
                  dispatch( { type: "core/REMOVE_TREE", tree } )
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
