import React from 'react'
import { render } from 'react-dom'
import TheApp from './components/TheApp'
import { hot } from 'react-hot-loader'
import dva, { connect } from "dva"
import models from "./models/index"
import mapValues from 'lodash/mapValues'
import './style/main.scss'
import { pick, notNil, cloneDeep } from './utils/lodash'
import localStore from "./store/localStore"
import { Router, Route } from 'dva/router'


const TheHotApp = hot( module )( connect( props => props )( TheApp ) )

const app = dva( {
  onStateChange() {
    let store = null

    try {
      const storeKeys = Object.keys( models )
      store = pick( app[ "_store" ].getState(), storeKeys )
    } catch ( e ) { console.log( e ) }

    notNil( store ) && localStore.setStore( store )
  }
} )

function model( app ) {
  let resModelsMap = models

  const storeLocal = localStore.getStore()

  function getNewResModelsMapStatesWithStoreLocal( resModelsMap, storeLocal ) {
    try {
      if ( resModelsMap && storeLocal ) {
        let clonedReModelsMap = cloneDeep( resModelsMap )
        mapValues( storeLocal, ( value, key ) => {
          clonedReModelsMap[ key ][ 'state' ] = value
        } )
        return clonedReModelsMap
      }
    } catch( e ) { console.log( e ) }
  
    return resModelsMap
  }

  resModelsMap = getNewResModelsMapStatesWithStoreLocal( resModelsMap, storeLocal  )

  mapValues( resModelsMap, ( model: any ) => app.model( model ) ) 
}

model( app )
// mapValues( models, model => app.model( model ) )




app.router( ( { history } ) =>
  <Router history={history}>
    <Route path="/" component={TheHotApp} />
  </Router>
)

app.start( "#app" )