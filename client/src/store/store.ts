import { pick } from "../utils/lodash"
import models from "../models"
import { root } from "../entry"

class Store {
  getData() {
    const storeKeys = Object.keys( models )
    const data = pick( root[ "_store" ].getState(), storeKeys )
    return data
  }
}

const store = new Store()
export default store