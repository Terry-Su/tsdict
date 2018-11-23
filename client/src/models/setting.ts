class Reducers {
  UPDATE_KEY = ( key: string ) => ( state, { value } ) => ( { ...state, [ key ]: value } )

  UPDATE_SERVER = this.UPDATE_KEY( 'server' )
}

export default {
  namespace: "setting",
  state    : {
    server: 'http://localhost:3000',
  },
  reducers: {
    ... new Reducers()
  },
  effects: {}
}
