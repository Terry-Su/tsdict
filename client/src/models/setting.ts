

export default {
  namespace: "setting",
  state    : {
    server        : 'http://192.168.1.7:3000',
    isSameHostName: true,
    port          : '3600',
  },
  reducers: {
    ... new ( class {
      UPDATE_STATE  =( state, { value } ) => value
      
      UPDATE_KEY = ( key: string, target?: any ) => ( state, { value } ) => ( { ...state, [ key ]: target !== undefined ? target : value } )
    
      UPDATE_SERVER = this.UPDATE_KEY( 'server' )

      TOOGLE_SAME_HOST_NAME = state => ( { ...state, isSameHostName: ! state.isSameHostName } )

      UPDATE_PORT = this.UPDATE_KEY( 'port' )
    } )()
  },
  effects: {}
}
