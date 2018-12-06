import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import selector from "../../../selectors"
import FunctionDialog from "../../Dialog/FunctionDialog"
import { DictDataWord } from "../../../../../shared/__typings__/DictData"

export default mapStateAndStyle()(
  class TheWordFunctionDialogue extends Component<{
    word: DictDataWord
    dispatch: Function
  }, any> {
    close = () => {
      this.props.dispatch( { type: 'treePage/HIDE_WORD_FUNCTION_DIALOG' } )
    }
    render() {
      const { dispatch } = this.props
      const { isWordFunctionDialogOpen, longPressingWord: word } = selector.treePageState
      return (
        <FunctionDialog
          open={isWordFunctionDialogOpen}
          data={{
            items: [
              {
                label  : "Rename",
                onClick: () => {
                  this.close()
                  dispatch( { type: 'treePage/UPDATE_RENAMING_NAME', value: word.name } )
                  dispatch( { type: 'treePage/SHOW_RENAME_DIALOG' } )
                  dispatch( { type : 'treePage/UPDATE_CALLBACK_AFTER_RENAMED', value: ( newName: string ) => {
                    dispatch( { type: 'core/UPDATE_WORD_NAME', word, value: newName } )
                  } } )
                }
              },
              {
                label  : "Delete",
                onClick: () => {
                  this.close()
                  dispatch( { type: 'treePage/UPDATE_CURRENT_TREE_REMOVE_WORD_ID', wordId: word.id } )
                }
              }
            ]
          }}
          onClose={ this.close }
        />
      )
    }
  }
)
