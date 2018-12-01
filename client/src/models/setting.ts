class Reducers {
  UPDATE_KEY = ( key: string ) => ( state, { value } ) => ( { ...state, [ key ]: value } )

  UPDATE_SERVER = this.UPDATE_KEY( 'server' )
}

export default {
  namespace: "setting",
  state    : {
    server: 'http://192.168.0.102:3000',
  },
  reducers: {
    ... new Reducers()
  },
  effects: {}
}
