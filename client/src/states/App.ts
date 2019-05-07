export default class App {
  origin: string = "http://localhost:3000"
  searchingWordName: string = ''

  SET_SEARCHING_WORD_NAME( searchingWordName: string ) { this.searchingWordName = searchingWordName }
}