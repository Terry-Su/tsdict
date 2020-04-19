import cloneDeep from 'lodash/cloneDeep'

import { TypeAction } from '@/__typings__'
import { reduxStore } from '@/entry'
import ModelMap from '@/states'

const modelMap = {}
const modelsStateMap: any = {}
const modelsSelectorMap = {}
const modelsActionMap = {}

let isUpdatingReduxState = false
const mutableReduxState = modelsStateMap
const getNewState = (state, model) => {
  const newState = {}
  for (const key in state) {
    newState[key] = model[key]
  }
  return newState
}
const dispatchUpdateReduxState = value => reduxStore.dispatch({ type: 'UPDATE', value });

(function () {
  // let modelKeys = []
  // for ( let key in ModelMap ) {
  //   const Model = ModelMap[ key ]
  //   const newKey = Model.name.replace( /^./, Model.name[ 0 ].toLowerCase() )
  //   modelKeys.push[ key ]
  // }
  for (const key in ModelMap) {
    const Model = ModelMap[key]
    const model = new Model()

    const newKey = key.replace(/^./, key[0].toLowerCase())
    modelMap[newKey] = model

    const descriptorMap = Object.getOwnPropertyDescriptors(model)
    const actionMap = {}
    const selectorMap = {}
    const initialState = {}
    for (const key in descriptorMap) {
      // if ( modelKeys.includes( key ) ) {
      //   continue
      // }
      const value = descriptorMap[key]
      const potential = value.value
      if (typeof potential !== 'function') {
        initialState[key] = potential
      }
      if (typeof potential === 'function') {
        actionMap[key] = potential
      }
    }

    const prototype = Object.getPrototypeOf(model)
    const prototypeDescriptorMap = Object.getOwnPropertyDescriptors(prototype)
    for (const key in prototypeDescriptorMap) {
      const value = prototypeDescriptorMap[key]
      const potential = value.value
      if (key !== 'constructor' && typeof potential === 'function') {
        actionMap[key] = potential
      }
      const potentialSelector = value.get
      if (typeof potentialSelector === 'function') {
        selectorMap[key] = potentialSelector
      }
    }
    modelsStateMap[newKey] = initialState
    modelsActionMap[newKey] = actionMap
    modelsSelectorMap[newKey] = selectorMap
  }

  // # inject models for each other
  for (const key in modelMap) {
    const currentModel = modelMap[key]
    for (const key2 in modelMap) {
      if (key2 !== key) {
        const injectingModel = modelMap[key2]
        currentModel[key2] = injectingModel
      }
    }
  }

  // # decorate actions
  for (const namespace in modelsActionMap) {
    const actionMap = modelsActionMap[namespace]
    const stateMap = modelsStateMap[namespace]
    const model = modelMap[namespace]

    for (const key in actionMap) {
      const func = model[key].bind(model)
      const newFunc = (...args) => {
        const alreadyUpdatedReduxState = isUpdatingReduxState
        if (!isUpdatingReduxState) { isUpdatingReduxState = true }
        const result = func(...args)
        const newState = getNewState(stateMap, model)
        mutableReduxState[namespace] = newState
        if (!alreadyUpdatedReduxState) {
          isUpdatingReduxState = false
          dispatchUpdateReduxState(mutableReduxState)
        }
        return result
      }
      model[key] = newFunc
    }
  }
})()

export {
  modelMap,
  modelsStateMap,
  modelsActionMap,
  modelsSelectorMap
}

export const rootReducer = (state = modelsStateMap, action) => {
  const res = {}
  if (action.type === 'UPDATE') {
    for (const key in modelsStateMap) {
      res[key] = action.value[key]
    }
    return res
  }
  return state
}
