export default class Dialog {
  visibleDialogConfirm: boolean = false
  dialogConfirmValue: string = null
  dialogConfirmTimer: number = null

  SHOW_DIALOG_CONFIRM = () => { this.visibleDialogConfirm = true }
  HIDE_DIALOG_CONFIRM = () => { this.visibleDialogConfirm = false }
  SET_DIALOG_CONFIRM_VALUE = ( value: string ) => { this.dialogConfirmValue = value }
  RESET_DIALOG_CONFIRM_VALUE = () => { this.dialogConfirmValue = null }
  SET_DIALOG_CONFIRM_TIMER = ( timer: number ) => { this.dialogConfirmTimer = timer }
  RESET_DIALOG_CONFIRM_TIMER = () => { this.dialogConfirmTimer = null }

  clearDialogConfirmTimer = () => {
    clearInterval( this.dialogConfirmTimer )
    this.RESET_DIALOG_CONFIRM_TIMER()
  }
  confirm = () => {
    this.RESET_DIALOG_CONFIRM_VALUE()
    this.SHOW_DIALOG_CONFIRM()
    return 123
    return new Promise( ( resolve, reject ) => {
      const timer = setInterval( () => {
        console.log( this.visibleDialogConfirm )
        if ( this.visibleDialogConfirm === false ) {
          this.clearDialogConfirmTimer()
          resolve( this.dialogConfirmValue )
        }
      }, 200 )
      this.SET_DIALOG_CONFIRM_TIMER( timer )
    } )
  }
}