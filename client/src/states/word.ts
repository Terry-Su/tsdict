import Delta from 'quill-delta'

import { TypeId } from '@/__typings__'
import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'
import { DictDataWord, DictDataWordDegree, Time } from '@shared/__typings__/DictData'

export default class Word {
  words: TypeWord[] = []

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

  ADD_WORD( name: string = '', config: { note?: Delta; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ) {
    if ( name.trim() === '' ) {
      return alert( 'Empty word name!' )
    }

    const negativeWord = this.getWordByName( name )
    if ( negativeWord != null ) {
      return alert( 'Word name exisited!' )
    }
    const newWord: DictDataWord = this.createWord( name, config )
    this.words.push( newWord )
  }

  DELETE_WORD_BY_WORD_INDEX( index: number ) {
    index > -1 && this.words.splice( index, index + 1 )
  }

  DELETE_WORD_BY_ID( id: TypeId ) {
    const index = this.words.findIndex( word => word.id === id )
    this.DELETE_WORD_BY_WORD_INDEX( index )
  }

  DELETE_WORD_BY_NAME( name: string ) {
    const index = this.words.findIndex( word => word.name === name )
    this.DELETE_WORD_BY_WORD_INDEX( index )
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
  
}