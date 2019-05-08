import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'

import Word from './Word'

export default class App {
  word: Word

  origin: string = "http://localhost:3000"
  searchingWordName: string = 'tick'

  get searchingWord(): TypeWord {
    return this.word.getWordByName( this.searchingWordName )
  }

  SET_SEARCHING_WORD_NAME( searchingWordName: string ) { this.searchingWordName = searchingWordName }

  addWordBySearchingWordName() {
    this.word.ADD_WORD( this.searchingWordName )
  }

  updateSearchingWordNote( newNote: TypeWordNote ) {
    this.word.SET_WORD_NOTE( this.searchingWord.id, newNote )
  }
  
  updateSearchingWordDegree( newDegree: TypeWordDegree ) {
    this.word.SET_WORD_DEGREE( this.searchingWord.id, newDegree )
  }

  deleteSearchingWord() {
    this.word.DELETE_WORD_BY_NAME( this.searchingWordName )
  }
}