export default {
  namespace: "app",
  state    : {
    searching: '',
  },
  reducers: {
    UPDATE_SEARCHING: ( state, { searching } ) => ( { ...state, searching} )
  },
  effects: {}
}
