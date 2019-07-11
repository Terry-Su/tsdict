export default class Message {
  visibleMessage: boolean = false
  messageText: string = ''

  // # visibleMessage
  SHOW_MESSAGE = () => { this.visibleMessage = true }
  HIDE_MESSAGE = () => { this.visibleMessage = false }

  // # messageText
  SET_MESSAGE_TEXT = ( text: string ) => { this.messageText = text }
  
  

  showMessage = ( text: string ) => {
    this.SET_MESSAGE_TEXT( text )
    this.SHOW_MESSAGE()

    setTimeout( () => this.HIDE_MESSAGE(), 2000 )
  }
}