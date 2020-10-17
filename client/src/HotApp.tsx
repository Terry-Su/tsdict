import React from 'react'
import App from './App'
import { hot } from 'react-hot-loader/root'
import { createStore } from 'redux'
import { rootReducer } from './utils/redux'
import { Provider } from 'react-redux'

export const reduxStore = createStore( rootReducer )
function Root() {
  return <Provider store={reduxStore}><App/></Provider>
}

export default hot(Root)
