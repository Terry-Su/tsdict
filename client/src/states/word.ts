import Delta from 'quill-delta'

import { TypeId } from '@/__typings__'
import { ReviewLevel } from '@/__typings__/review'
import {
    TypeWord, TypeWordNextReviewTime, TypeWordNote, TypeWordReviewLevel
} from '@/__typings__/word'
import { removeArrayElement } from '@/utils/js'
import { DictDataWord, Time } from '@shared/__typings__/DictData'

import Tag from './Tag'
import Tree from './Tree'

export default class Word {
  tree: Tree;
  tag: Tag;

  words: TypeWord[] = [];
  visibleWordPanel: boolean = true
  

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

  get createWord() {
    return (
      name: string,
      config: {
        note?: Delta;
        reviewLevel?: ReviewLevel;
        createTime?: Time;
      }
    ) => ( {
      id         : this.availableId,
      name,
      note       : config.note,
      reviewLevel: config.reviewLevel,
      createTime : new Date().getTime(),
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

  SET_WORDS = ( words: TypeWord[] ) => {
    this.words = words
  };
  REFRESH_WORDS = () => {
    this.words = [ ...this.words ]
  };

  ADD_WORD(
    name: string = "",
    config: { note?: Delta; degree?: ReviewLevel; createTime?: Time } = {
      degree: null,
    }
  ): TypeWord {
    if ( name.trim() === "" ) {
      alert( "Empty word name!" )
      return null
    }

    const negativeWord = this.getWordByName( name )
    if ( negativeWord != null ) {
      alert( "Word name exisited!" )
      return null
    }
    const newWord: TypeWord = this.createWord( name, config )
    this.words.push( newWord )
  }

  DELETE_WORD( word: TypeWord ) {
    removeArrayElement( this.words, word )
  }


  // # visibleWordPanel
  TOOGLE_WORD_PANEL() { this.visibleWordPanel = ! this.visibleWordPanel }

  setWordNote( word: TypeWord, newNote: TypeWordNote ) {
    word.note = newNote
    this.REFRESH_WORDS()
  }
  setWordReviewLevel( word: TypeWord, newReviewLevel: TypeWordReviewLevel  ) {
    word.reviewLevel = newReviewLevel
    this.REFRESH_WORDS()
  }
  resetWordReviewLevel( word: TypeWord ) {
    word.reviewLevel = 1
    this.REFRESH_WORDS()
  }
  setWordNextReviewTime( word: TypeWord, newNextReviewTime: TypeWordNextReviewTime  ) {
    word.nextReviewTime = newNextReviewTime
    this.REFRESH_WORDS()
  }

  deleteWord( word: TypeWord ) {
    this.DELETE_WORD( word )
    this.tree.DELETE_WORD_ID_RECURVELY_IN_TREE( word.id )
    this.tag.DELETE_WORD_ID_CONSTANTLY_IN_TAGS( word.id )
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
