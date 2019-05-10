import { TypeId, TypeTag } from '@/__typings__'
import { TypeWord } from '@/__typings__/word'
import { emptyString } from '@/utils/getters'
import { removeArrayElement } from '@/utils/js'

import Word from './Word'

export default class Tag {
  word: Word

  tags: TypeTag[] = []


  get tagIds(): TypeId[] {
    let res = []
    this.tags.forEach( tag => res.concat( tag.ids ) )
    return res
  }

  get availableTagId(): TypeId {
    let num = 0
    while ( this.tagIds.includes( num ) ) {
      num++
    }
    return num
  }

  get createTag()  {
    return ( name: string, config: { id?: TypeId, ids: TypeId[] } = { ids: [] } ): TypeTag => ( {
      id : config.id != null ? config.id : this.availableTagId,
      name,
      ids: config.ids,
    } )
  }

  get getTagByName() {
    return ( tagName: string ): TypeTag => this.tags.find( tag => tag.name === tagName )
  }

  SET_TAGS = ( tags: TypeTag[] ) => { this.tags = tags }

  ADD_TAG_BY_NAME = ( name: string ) => {
    if ( name == null || emptyString( name ) ) { return }
    const negativeTag = this.getTagByName( name )
    if ( negativeTag != null ) { return alert( 'Tag name exisited!' )  }
    const tag = this.createTag( name )
    this.tags.push( tag )
  }

  SET_TAG_NAME( tag: TypeTag, newName: string ) {
    if ( newName == null || emptyString( newName ) ) { return }
    tag.name = newName
  }

  DELETE_TAG = ( tag: TypeTag ) => { removeArrayElement( this.tags, tag ) }

  ADD_TAG_WORD_ID( tag: TypeTag, wordId: TypeId ) {
    const existed = tag.ids.includes( wordId )
    ! existed && tag.ids.push( wordId )
  }


  DELETE_WORD_ID_IN_TAG( wordId: TypeId, tag: TypeTag ) {
    removeArrayElement( tag.ids, wordId )
  }

  DELETE_WORD_ID_CONSTANTLY_IN_TAGS( wordId: TypeId ) {
    this.tags.forEach( tag => {
      const targetWordIds = tag.ids.filter( id => id === wordId )
      targetWordIds.forEach( targetWordId => {
        removeArrayElement( tag.ids, targetWordId )
      } )
    } )
  }

  addTagWordByName( tag: TypeTag, wordName: string ) {
    if ( wordName == null || emptyString( wordName ) ) { return }
    
    const word = this.word.getWordByName( wordName )
    let targetWord: TypeWord
    if ( word == null ) {
      this.word.ADD_WORD( wordName )
      targetWord = this.word.getWordByName( wordName )
    } else {
      targetWord = word
    }
    targetWord != null && this.ADD_TAG_WORD_ID( tag, targetWord.id )
  }
}