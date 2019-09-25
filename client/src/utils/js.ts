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



export function getRandomArrayElement( arr: any[] ) {
  const { length } = arr
  // [0, 1)
  const randomRate = Math.random()
  const index = Math.ceil( ( length - 1 ) * randomRate )
  return arr[ index ]
}

// # format: '0000-00-00'
export function getDateDayString( date: Date ) {
  // return date.toISOString().replace( /T.*/, '' )
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const theDate = date.getDate()

  function getTwoNumberString( number ) {
    return number >= 10 ? `${number}` : `0${number}` 
  }

  return `${year}-${getTwoNumberString( month )}-${getTwoNumberString( theDate )}`
}