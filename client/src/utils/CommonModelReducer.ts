export default class CommonModelReducer {
  UPDATE_STATE = ( state, { value } ) => value

  UPDATE_STATE_VALUE = function <State, Value>( key: string ) {
    return ( state: State, { value }: { value : Value } ) => ( {
      ...state as Object,
      [ key ]: value
    } )
  }

  UPDATE_STATE_KEY_VALUE = function <State, Value>( key: string, value: Value ) {
    return ( state: State ) => ( {
      ...state as Object,
      [ key ]: value
    } )
  }
}