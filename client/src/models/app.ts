import selector from '@/selectors'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { uniq } from '@/utils/lodash'

export class AppState {
  isShowingCurrentWordPanel: boolean = false

  searching: string = ""
  isShowingMessage: boolean = false
  message: string = ""
  messageType: string = "success"

  recentAddedTagNames: string[] = []

}

export default {
  namespace: "app",
  state    : {
    ...new AppState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      UPDATE_STATE = ( state, { value } ) => value
      UPDATE_SEARCHING = ( state, { value } ) => ( { ...state, searching: value } )

      SHOW_CURRENT_WORD_PANEL = this.UPDATE_STATE_KEY_VALUE( 'isShowingCurrentWordPanel', true )
      HIDE_CURRENT_WORD_PANEL = this.UPDATE_STATE_KEY_VALUE( 'isShowingCurrentWordPanel', false )

      // message
      // SHOW_MESSAGE   = state => ( { ...state, isShowingMessage: true } )
      HIDE_MESSAGE = state => ( { ...state, isShowingMessage: false } )

      COMMON_SHOW_MESSAGE = (
        state,
        { messageType = "success", message = "" }
      ) => ( {
        ...state,
        isShowingMessage: true,
        message,
        messageType
      } )

      SHOW_BACKUP_SUCCESS = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "success",
          message    : "Backup successfully"
        } )

      SHOW_BACKUP_FAIL = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "error",
          message    : "Backup failed"
        } )

      SHOW_PULL_SUCCESS = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "success",
          message    : "Pull successfully"
        } )

      SHOW_PULL_FAIL = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "error",
          message    : "Pull failed"
        } )

      SHOW_PUSH_SUCCESS = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "success",
          message    : "Push successfully"
        } )

      SHOW_PUSH_FAIL = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "error",
          message    : "Push failed"
        } )

      // SHOW_CLEAN_SUCCESS = state => this.COMMON_SHOW_MESSAGE( state, {
      //   messageType: 'success',
      //   message    : 'Clean media successfully',
      // } )

      // SHOW_CLEAN_FAIL = state => this.COMMON_SHOW_MESSAGE( state, {
      //   messageType: 'error',
      //   message    : 'Clean media failed',
      // } )

      SHOW_UPDATE_MEDIA_SUCCESS = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "success",
          message    : "Update media successfully"
        } )

      SHOW_UPDATE_MEDIA_FAIL = state =>
        this.COMMON_SHOW_MESSAGE( state, {
          messageType: "error",
          message    : "Update media failed"
        } )

      ADD_TO_RECENT_ADDED_TAG_NAMES = ( state: AppState, { newName }: {newName: string} )=> {
        const { recentAddedTagNames } = state
        recentAddedTagNames.unshift( newName )
        state.recentAddedTagNames = uniq( recentAddedTagNames )
        return { ...state }
      }
    }()
  },
  effects: {
    
  }
}
