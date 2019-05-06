import CommonModelReducer from '@/utils/CommonModelReducer'

export class SettingState {
  server: string = "http://192.168.20.67:3000"
  isSameHostName: boolean = true
  port: string = "3000"
}
export default {
  namespace: "setting",
  state    : new SettingState(),
  reducers : {
    ...new class extends CommonModelReducer {
      UPDATE_STATE = ( state, { value } ) => value

      UPDATE_KEY = ( key: string, target?: any ) => ( state, { value } ) => ( {
        ...state,
        [ key ]: target !== undefined ? target : value
      } )

      UPDATE_SERVER = this.UPDATE_KEY( "server" )

      TOOGLE_SAME_HOST_NAME = state => ( {
        ...state,
        isSameHostName: !state.isSameHostName
      } )

      UPDATE_PORT = this.UPDATE_KEY( "port" )
    }()
  },
  effects: {}
}
