import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import ModelMap from './states'
import Test from './Test'
import { rootReducer } from './utils/redux'

export const reduxStore = createStore( rootReducer )



const App = hot( module )( Test )

render( <Provider store={reduxStore}><App/></Provider>, document.getElementById( 'root' ) )
