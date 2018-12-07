import { Tag } from '@/__typings__'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { DictDataWord } from '@shared/__typings__/DictData'

export class TagPageState {
  currentTagId: string
  isTagFunctionDialogOpen: boolean = false
  isWordFunctionDialogOpen: boolean = false
  longPressingTag: Tag
  longPressingWord: DictDataWord
  isRenameDialogOpen: boolean = false
  renamingName: string = ''
  callbackAfterRenamed: Function
}

export default {
  namespace: "tagPage",
  state    : {
    ...new TagPageState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      UPDATE_CURRENT_TAG_ID = this.UPDATE_STATE_KEY( 'currentTagId' )

      SHOW_TAG_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isTagFunctionDialogOpen', true )
      HIDE_TAG_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isTagFunctionDialogOpen', false )

      SHOW_WORD_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isWordFunctionDialogOpen', true )
      HIDE_WORD_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isWordFunctionDialogOpen', false )

      UPDATE_LONG_PRESSING_TAG = this.UPDATE_STATE_KEY( 'longPressingTag' )
      UPDATE_LONG_PRESSING_WORD = this.UPDATE_STATE_KEY( 'longPressingWord' )

      SHOW_RENAME_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isRenameDialogOpen', true )
      HIDE_RENAME_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isRenameDialogOpen', false )
      UPDATE_RENAMING_WORD = this.UPDATE_STATE_KEY( 'renamingName' )
      UPDATE_CALLBACK_AFTER_RENAMED = this.UPDATE_STATE_KEY( 'callbackAfterRenamed' )
    }()
  },
  effects: {}
}