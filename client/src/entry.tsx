import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import localStore from './store/localStore'
import { rootReducer } from './utils/redux'

export const reduxStore = createStore( rootReducer )

reduxStore.subscribe( () => {
  localStore.setStore( reduxStore.getState() )
} )


const HotApp = hot( module )( App )

render( <Provider store={reduxStore}><HotApp/></Provider>, document.getElementById( 'root' ) )
