import Delta from 'quill-delta'

import { TypeId } from '@/__typings__'
import { TypeWord } from '@/__typings__/word'
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

  SET_WORDS = ( words: TypeWord[]  ) => { this.words = words }

  ADD_WORD( name: string, config: { note?: Delta; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ) {
    const newWord: DictDataWord = this.createWord( name, config )
    this.words.push( newWord )
  }
}