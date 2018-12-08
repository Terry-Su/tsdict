import { isNil } from 'lodash'

export function scrollToVertical( element, number = 0 ) {
  if ( element && ! isNil( element.scrollTop ) ) {
    element.scrollTop = number
  }
}

export function scrollToTop( element ) {
  scrollTo( element, 0 )
}
