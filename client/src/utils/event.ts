export const EventTypes = {
  keyDown : 'keyDown',
  keyPress: 'keyPress',
}

export const EventTriggers = {
  keyDown: e => events.trigger( EventTypes.keyDown, event ),
}

class Events {
  private keyDown: Function[] = []
  private keyPress: Function[] = []

  addHandler( key: string, handler: Function ) {
    const potentialHandlers = this[ key ] 
    if ( Array.isArray( potentialHandlers ) ) {
      potentialHandlers.push( handler )
    }
  }

  removeHandler( key: string, handler: Function ) {
    const potentialHandlers = this[ key ] 
    if ( Array.isArray( potentialHandlers ) ) {
      const targetIndex = potentialHandlers.indexOf( handler )
      if ( targetIndex > -1 ) {
        potentialHandlers.splice( targetIndex, 1 )
      }
    }
  }

  trigger( key, event ) {
    const potentialHandlers = this[ key ] 
    if ( Array.isArray( potentialHandlers ) ) {
      potentialHandlers.forEach( v => v( event ) )
    }
  }
}

const events = new Events
export default events