export default class CommonModelReducer {
  UPDATE_STATE_VALUE = function <T>( key: string ) {
    return ( state, { value }: { value : T } ) => ( {
      ...state,
      [ key ]: value
    } )
  }
}