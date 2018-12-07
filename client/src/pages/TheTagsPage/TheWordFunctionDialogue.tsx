import React, { Component } from 'react'

import FunctionDialog from '@/components/Dialog/FunctionDialog'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle()(
  class TheTagFunctionDialogue extends Component<any, any> {
    render() {
      const { dispatch } = this.props
      const { isWordFunctionDialogOpen } = selector.tagPageState
      return (
        <FunctionDialog
          open={isWordFunctionDialogOpen}
          data={{
            items: [
              {
                label  : "Rename",
                onClick: () => {
                  dispatch( { type: 'tagPage/HIDE_WORD_FUNCTION_DIALOG' } )
                  dispatch( { type : 'tagPage/UPDATE_CALLBACK_AFTER_RENAMED', value: ( newName: string ) => {
                    const { longPressingWord: word, } = selector.tagPageState
                    dispatch( { type: 'core/UPDATE_WORD_NAME', word, value: newName } )
                  } } )
                  dispatch( { type: 'tagPage/UPDATE_RENAMING_WORD', value: selector.tagPageState.longPressingWord.name } )
                  dispatch( { type: 'tagPage/SHOW_RENAME_DIALOG' } )
                }
              },
              {
                label  : "Delete",
                onClick: () => {
                  dispatch( { type: 'tagPage/HIDE_WORD_FUNCTION_DIALOG' } )
                  dispatch( { type: 'core/removeLongPressingWord' } )
                }
              }
            ]
          }}
          onClose={() =>
            dispatch( { type: "tagPage/HIDE_WORD_FUNCTION_DIALOG" } )
          }
        />
      )
    }
  }
)
