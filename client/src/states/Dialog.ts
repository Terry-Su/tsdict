export default class Dialog {
  visibleDialogConfirm: boolean = false
  dialogConfirmValue: string = null
  dialogConfirmTimer: number = null
  dialogConfirmDesc: string = ''

  SHOW_DIALOG_CONFIRM = () => { this.visibleDialogConfirm = true }
  HIDE_DIALOG_CONFIRM = () => { this.visibleDialogConfirm = false }

  SET_DIALOG_CONFIRM_VALUE = ( value: string ) => { this.dialogConfirmValue = value }
  RESET_DIALOG_CONFIRM_VALUE = () => { this.dialogConfirmValue = null }

  SET_DIALOG_CONFIRM_TIMER = ( timer: number ) => { this.dialogConfirmTimer = timer }
  RESET_DIALOG_CONFIRM_TIMER = () => { this.dialogConfirmTimer = null }

  SET_DIALOG_CONFIRM_DESC = ( desc: string ) => { this.dialogConfirmDesc = desc }

  clearDialogConfirmTimer = () => {
    clearInterval( this.dialogConfirmTimer )
    this.RESET_DIALOG_CONFIRM_TIMER()
  }
  confirm = ( desc: string = '' ) => {
    this.RESET_DIALOG_CONFIRM_VALUE()
    this.SET_DIALOG_CONFIRM_DESC( desc )
    this.SHOW_DIALOG_CONFIRM()
    return new Promise( ( resolve, reject ) => {
      const timer = setInterval( () => {
        if ( this.visibleDialogConfirm === false ) {
          this.clearDialogConfirmTimer()
          if ( this.dialogConfirmValue == null ) { reject() }
          resolve( this.dialogConfirmValue )
        }
      }, 200 )
      this.SET_DIALOG_CONFIRM_TIMER( timer )
    } )
  }
}