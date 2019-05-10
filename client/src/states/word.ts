import Delta from 'quill-delta'

import { TypeId } from '@/__typings__'
import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'
import { removeArrayElement } from '@/utils/js'
import { DictDataWord, DictDataWordDegree, Time } from '@shared/__typings__/DictData'

import Tag from './Tag'
import Tree from './Tree'

export default class Word {
  words: TypeWord[] = []
  tree: Tree
  tag: Tag

  get ids(): number[] {
    return this.words.map( v => v.id )
  }

  get availableId(): number {
    let num = 0
    while ( this.ids.includes( num ) ) {
      num++
    }
    return num
  }

  get createWord( ) {
    return ( name: string, config: { note?: Delta; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ) => ( {
        id        : this.availableId,
        name,
        note      : config.note,
        degree    : config.degree,
        createTime: new Date().getTime(),
      } )
  }

  get getWordById(): Function {
    const self = this
    return function( id: TypeId ): TypeWord {
        return self.words.find( word => word.id === id )
    } 
  }

  get getWordByName(): Function {
    const self = this
    return function( name: string ): TypeWord {
        return self.words.find( word => word.name === name )
    } 
  }

  SET_WORDS = ( words: TypeWord[]  ) => { this.words = words }
  REFRESH_WORDS = () => { this.words = [ ...this.words ] }

  ADD_WORD( name: string = '', config: { note?: Delta; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ): TypeWord {
    if ( name.trim() === '' ) {
      alert( 'Empty word name!' )
      return null
    }

    const negativeWord = this.getWordByName( name )
    if ( negativeWord != null ) {
      alert( 'Word name exisited!' )
      return null
    }
    const newWord: TypeWord = this.createWord( name, config )
    this.words.push( newWord )
  }

  DELETE_WORD( word: TypeWord ) {
    removeArrayElement( this.words, word )
  }

  SET_WORD_PROP( id: TypeId, prop: string, value: any ) {
    const word: TypeWord = this.getWordById( id )
    if ( word != null ) {
      if ( word.hasOwnProperty( prop ) ) {
        word[ prop ] = value
        this.REFRESH_WORDS()
      } else {
        console.log( `Word "${word.name}" has no property: ${ prop }!` )
      }
    }
  }

  SET_WORD_NOTE( id: TypeId, newNote: TypeWordNote ) { this.SET_WORD_PROP( id, 'note', newNote ) }
  SET_WORD_DEGREE( id: TypeId, newDegree: TypeWordDegree ) { this.SET_WORD_PROP( id, 'degree', newDegree ) }
  

  deleteWord ( word: TypeWord ) {
    this.DELETE_WORD( word )
    this.tree.DELETE_WORD_ID_IN_TREE( word.id )
    this.tag.DELETE_WORD_ID_IN_TAGS( word.id )
  }

  deleteWordById( id: TypeId ) {
    const word = this.words.find( word => word.id === id )
    this.deleteWord( word )
  }

  deleteWordByName( name ) {
    const word = this.words.find( word => word.name === name )
    this.deleteWord( word )
  }
}