import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import { rootReducer } from './utils/redux'

export const reduxStore = createStore( rootReducer )

const HotApp = hot( module )( App )

render( <Provider store={reduxStore}><HotApp/></Provider>, document.getElementById( 'root' ) )