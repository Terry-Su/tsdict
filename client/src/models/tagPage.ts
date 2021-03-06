import { Tag } from '@/__typings__'
import { SortType } from '@/components/SortSection'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

export class TagPageState {
  currentTagId: string
  isTagFunctionDialogOpen: boolean = false
  isWordFunctionDialogOpen: boolean = false
  longPressingTag: Tag
  longPressingWord: DictDataWord
  isRenameDialogOpen: boolean = false
  renamingName: string = ''
  callbackAfterRenamed: Function

  // top bar: sort
  sortType: SortType = SortType.Name
  isAscendingName: boolean = true
  isAscendingDegree: boolean = true
  isAscendingCreateTime: boolean = true
  // top bar: filter
  startDegree: DictDataWordDegree = 0
  endDegree: DictDataWordDegree = 10
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

      // top bar: sort
      UPDATE_SORT_TYPE = this.UPDATE_STATE_KEY( 'sortType' )
      UPDATE_IS_ASCENDING_NAME = this.UPDATE_STATE_KEY( 'isAscendingName' )
      UPDATE_IS_ASCENDING_DEGREE = this.UPDATE_STATE_KEY( 'isAscendingDegree' )
      UPDATE_IS_ASCENDING_CREATE_TIME = this.UPDATE_STATE_KEY( 'isAscendingCreateTime' )
      // top bar: filter
      UPDATE_START_DEGREE = this.UPDATE_STATE_KEY( 'startDegree' )
      UPDATE_END_DEGREE = this.UPDATE_STATE_KEY( 'endDegree' )
    }()
  },
  effects: {}
}