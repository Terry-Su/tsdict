import { cloneDeep, findIndex, isEqual } from "./lodash"

export function removeArrayElement( array, element ) {
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