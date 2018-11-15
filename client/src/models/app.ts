export default {
  namespace: "app",
  state    : {
    searching: '',
  },
  reducers: {
    UPDATE_SEARCHING: ( state, { value } ) => ( { ...state, searching: value } )
  },
  effects: {}
}
