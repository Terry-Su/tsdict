import { LOCAL_STOREAGE_STORE_NAME } from '../constants/names'
class LocalStore {
  setItem( key, data ) {
    try {
      const jsonString = JSON.stringify( data )
      localStorage.setItem( key, jsonString )
    } catch ( e ) {
      console.log( e )
    }
  }
  getItem( key ) {
    try {
      const jsonString = localStorage.getItem( key )
      const json = JSON.parse( jsonString )
      return json
    } catch ( e ) {
      console.log( e )
      return null
    }
  }

  setStore( store ) {
    this.setItem( LOCAL_STOREAGE_STORE_NAME, store )
  }
  getStore() {
    return this.getItem( LOCAL_STOREAGE_STORE_NAME )
  }

}

export default new LocalStore()
