import './style/main.scss'

import dva, { connect } from 'dva'
import { Route, Router } from 'dva/router'
import mapValues from 'lodash/mapValues'
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

import { NOT_TO_SYNC_MODEL_KEYS } from './constants/modelKeys'
import models from './models/index'
import selector from './selectors'
import localStore from './store/localStore'
import TheApp from './TheApp'
import { cloneDeep, notNil, pick } from './utils/lodash'

const TheHotApp = hot( module )( connect( props => props )( TheApp ) )

const app = dva( {
  onStateChange() {
    updateLocalStore()
  },
} )

export const root = app

function updateLocalStore() {
    const data = selector.storeData
    notNil( data ) && localStore.setStore( data )
}

function model( app ) {
  let resModelsMap = models

  const storeLocal = localStore.getStore()

  function getNewResModelsMapStatesWithStoreLocal( resModelsMap, storeLocal ) {
    try {
      if ( resModelsMap && storeLocal ) {
        let clonedReModelsMap = cloneDeep( resModelsMap )
        mapValues( storeLocal, ( value, key ) => {
          if ( ! NOT_TO_SYNC_MODEL_KEYS.includes( key ) ) {
            clonedReModelsMap[ key ][ 'state' ] = {
              ...clonedReModelsMap[ key ][ 'state' ],
              ...value,
            }
          }
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




app.router( ( { history } ) => <Router history={history}>
    <Route path="/" component={TheHotApp} />
  </Router>
)

app.start( "#root" )

updateLocalStore()
