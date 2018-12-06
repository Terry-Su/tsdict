import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import selector from "../../../selectors"
import FunctionDialog from "../../Dialog/FunctionDialog"

export default mapStateAndStyle()(
  class TheTagFunctionDialogue extends Component<any, any> {
    render() {
      const { dispatch } = this.props
      const { isTagFunctionDialogOpen } = selector.tagPageState
      return (
        <FunctionDialog
          open={isTagFunctionDialogOpen}
          data={{
            items: [
              {
                label  : "Rename",
                onClick: () => {
                  dispatch( { type: 'tagPage/HIDE_TAG_FUNCTION_DIALOG' } )
                  dispatch( { type : 'tagPage/UPDATE_CALLBACK_AFTER_RENAMED', value: ( newName: string ) => {
                    const { longPressingTag: tag, } = selector.tagPageState
                    dispatch( { type: 'core/UPDATE_TAG_NAME', tag, newName } )
                  } } )
                  dispatch( { type: 'tagPage/UPDATE_RENAMING_WORD', value: selector.tagPageState.longPressingTag.name } )
                  dispatch( { type: 'tagPage/SHOW_RENAME_DIALOG' } )
                }
              },
              {
                label  : "Delete",
                onClick: () => {
                  dispatch( { type: 'tagPage/HIDE_TAG_FUNCTION_DIALOG' } )
                  dispatch( { type: 'core/removeLongPressingTag' } )
                }
              }
            ]
          }}
          onClose={() =>
            dispatch( { type: "tagPage/HIDE_TAG_FUNCTION_DIALOG" } )
          }
        />
      )
    }
  }
)
