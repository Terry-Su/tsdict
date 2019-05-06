import { connect } from 'react-redux'

import { TypeAction } from '@/__typings__'
import { reduxStore } from '@/entry'

import { modelMap, modelsActionMap, modelsSelectorMap } from './redux'

export const States = ( namespace, ...keys ) => ( TagetClass ) => connect( rootState => {
  const state = rootState[ namespace ]  
  let res = {}
  for ( let key of keys ) {
    if ( state.hasOwnProperty( key ) ) {
      res[ key ] = state[ key ]

      const Component = typeof TagetClass !== 'object' ? TagetClass : TagetClass.WrappedComponent 
      Component.prototype[ key ] = res[ key ]
    }
  }
  return res
} )( TagetClass )


export const Selectors = ( namespace, ...keys ) => ( TagetClass ) => connect( rootState => {
  const model = modelMap[ namespace ]
  const selectorMap = modelsSelectorMap[ namespace ]
  let res = {}
  for ( let key of keys ) {
    const selector = selectorMap[ key ]
    if ( selector != null ) {
      res[ key ] = model[ key ]
      const Component = typeof TagetClass !== 'object' ? TagetClass : TagetClass.WrappedComponent 
      Component.prototype[ key ] = res[ key ]
    }
  }
  return res
} )( TagetClass )





export const Actions = ( namespace: string, ...keys ) => TagetClass => connect( null, () => {
  const actionMap = modelsActionMap[ namespace ]
  const model = modelMap[ namespace ]
  let res = {}
  keys.forEach( key => {
    const func = actionMap[ key ]
    if ( func != null ) {
      res[ key ] = ( ...args ) => model[ key ]( ...args )
      const Component = typeof TagetClass !== 'object' ? TagetClass : TagetClass.WrappedComponent 
      Component.prototype[ key ] = res[ key ]
    }
  } )
  return res
} )( TagetClass )





