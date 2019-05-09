import { TypeId, TypeTag } from '@/__typings__'
import { removeArrayElement } from '@/utils/js'

import Word from './Word'

export default class Tag {
  word: Word

  tags: TypeTag[] = []

  SET_TAGS = ( tags: TypeTag[] ) => { this.tags = tags }

  deleteWordIdInTags( wordId: TypeId ) {
    this.tags.forEach( tag => {
      const targetWordIds = tag.ids.filter( id => id === wordId )
      targetWordIds.forEach( targetWordId => {
        removeArrayElement( tag.ids, targetWordId )
      } )
    } )
  }
}