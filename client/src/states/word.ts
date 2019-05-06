import { NoteData } from '@/components/Note/Note'
import { DictDataWord, DictDataWordDegree, Time } from '@shared/__typings__/DictData'

export default class Word {
  words: DictDataWord[] = []

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

  get getNewWord( ) {
    return ( name: string, config: { note?: NoteData; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ) => ( {
        id        : this.availableId,
        name,
        note      : config.note,
        degree    : config.degree,
        createTime: new Date().getTime(),
      } )
  }

  ADD_WORD( name: string, config: { note?: NoteData; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 } ) {
    const newWord: DictDataWord = this.getNewWord( name, config )
    this.words.push( newWord )
  }
}