import cloneDeep from 'lodash/cloneDeep'

import { TypeAction } from '@/__typings__'
import { reduxStore } from '@/entry'
import ModelMap from '@/state'

let modelMap = {}
let modelsStateMap = {}
let modelsSelectorMap = {}
let modelsActionMap = {}


let isUpdatingReduxState = false
let mutableReduxState = modelsStateMap
const getNewState = ( state, model  ) => {
  let newState = {}
  for ( let key in state ) {
    newState[ key ] = model[ key ]
  }
  return newState
}
const dispatchUpdateReduxState = value => reduxStore.dispatch( { type: 'UPDATE', value } )

{
  let modelKeys = []
  for ( let key in ModelMap ) {
    const Model = ModelMap[ key ]
    const newKey = Model.name.replace( /^./, Model.name[ 0 ].toLowerCase() )
    modelKeys.push[ key ]
  }
  for ( let key in ModelMap ) {
    const Model = ModelMap[ key ]
    const model = new Model()

    const newKey = Model.name.replace( /^./, Model.name[ 0 ].toLowerCase() )
    modelMap[ newKey ] = model 

    const descriptorMap = Object.getOwnPropertyDescriptors( model )
    let actionMap = {}
    let selectorMap = {}
    let initialState = {}
    for ( let key in descriptorMap ) {
      if ( modelKeys.includes( key ) ) {
        continue
      }
      const value = descriptorMap[ key ]
      const potential = value.value
      if ( typeof potential !== 'function' ) {
        initialState[ key ] = potential
      }
      if ( typeof potential === 'function' ) {
        actionMap[ key ] = potential
      }
    }

    const prototype = Object.getPrototypeOf( model )
    const prototypeDescriptorMap = Object.getOwnPropertyDescriptors( prototype )
    for ( let key in prototypeDescriptorMap ) {
      const value = prototypeDescriptorMap[ key ]
      const potential = value.value
      if ( key !== 'constructor' && typeof potential === 'function' ) {
        actionMap[ key ] = potential
      }
      const potentialSelector = value.get
      if ( typeof potentialSelector === 'function' ) {
        selectorMap[ key ] = potentialSelector
      }
    }
    modelsStateMap[ newKey ] = initialState
    modelsActionMap[ newKey ] = actionMap
    modelsSelectorMap[ newKey ] = selectorMap
  }

  // # inject models for each other
  for ( let key in modelMap ) {
    const currentModel = modelMap[ key ]
    for ( let key2 in modelMap ) {
      if ( key2 !== key ) {
        const injectingModel = modelMap[ key2 ]
        currentModel[ key2 ] = injectingModel
      }
    }
  }

  // # decorate actions
  for ( let namespace in modelsActionMap ) {
    const actionMap = modelsActionMap[ namespace ]
    const stateMap = modelsStateMap[ namespace ]
    const model = modelMap[ namespace ]

    for ( let key in actionMap ) {
      const func = model[ key ].bind( model )
      const newFunc = ( ...args ) => {
        const alreadyUpdatingReduxState = isUpdatingReduxState
        if ( ! isUpdatingReduxState ) { isUpdatingReduxState = true }
        func( ...args )
        const newState = getNewState( stateMap, model )
        mutableReduxState[ namespace ] = newState
        if ( ! alreadyUpdatingReduxState ) {
          isUpdatingReduxState = false
          dispatchUpdateReduxState( mutableReduxState )
        }
      }
      model[ key ] = newFunc
    }
  }
}

export {
  modelMap,
  modelsStateMap,
  modelsActionMap,
  modelsSelectorMap
}


export const rootReducer = ( state = modelsStateMap, action ) => {
  let res = {}
  if ( action.type === 'UPDATE' ) {
    for ( let key in modelsStateMap ) {
      res[ key ] = action.value[ key ]
    }
    return res
  }
  return state
}

// export function generateRootReducer( Models: any[] ): any {
//   let reducerMap = {}
//   Models.forEach( Model => {
//     const newName = Model.name.replace( /^./, Model.name[ 0 ].toLowerCase() )
//     const initialState = modelsStateMap[ newName ]
//     const actionMap = modelsActionMap[ newName ]
//     let model = new Model()
//     const getNewState = ( state, model  ) => {
//       let newState = {}
//       for ( let key in state ) {
//         newState[ key ] = model[ key ]
//       }
//       return newState
//     }
//     const reducer = ( state = initialState, action: TypeAction ) => {
//       const { namespace, name } = action
//       if ( namespace === newName && actionMap[ name ] != null ) {
//         for ( let key in state ) {
//           model[ key ] = state[ key ]
//         }
//         const { value: args } = action
//         model[ name ]( ...args )
//         return getNewState( state, model )
//       }

//       return state
//     }
//     reducerMap[ newName ] = reducer
//   } )
  
//   const rootReducer = ( state = modelsStateMap, action ) => {
//     let res = {}
//     if ( action.type === 'UPDATE' ) {
//       for ( let key in modelsStateMap ) {
//         res[ key ] = action.value[ key ]
//       }
//       return res
//     }
//     return state
//   }

//   return rootReducer
// }
