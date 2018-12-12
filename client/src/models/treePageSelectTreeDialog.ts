import CommonModelReducer from '@/utils/CommonModelReducer'

export class TreePageSelectTreeDialogState {
  isOpen: boolean = false
  callbackAfterConfirmed: Function
}

export default {
  namespace: "treePageSelectTreeDialog",
  state    : {
    ...new TreePageSelectTreeDialogState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      OPEN = this.UPDATE_STATE_KEY_VALUE( 'isOpen', true )

      CLOSE = this.UPDATE_STATE_KEY_VALUE( 'isOpen', false )

      UPDATE_CALLBACK_AFTER_CONFIRMED = this.UPDATE_STATE_KEY( 'callbackAfterConfirmed' )
      
    }()
  },
  effects: {}
}
