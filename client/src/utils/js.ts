import { cloneDeep, findIndex, isEqual, isUndefined } from './lodash'

export function removeArrayElement( array: any[], element: any ) {
  const index = findIndex( array, item => item === element )

  if ( index !== -1 ) {
    array.splice( index, 1 )
    return array
  }

  throw `unexpected removeArrayElement! array: ${array}`
}



export function removeArrayElementByIndex( array, index: number ) {
  if ( index !== -1 ) {
    array.splice( index, 1 )
    return array
  }

  throw `unexpected removeArrayElement! array: ${array}`
}



export function getValueNotUndefined( a: any, b: any ) {
  return isUndefined( a ) ? b : a
}