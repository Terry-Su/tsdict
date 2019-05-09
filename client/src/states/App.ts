import { Position } from '@/__typings__'
import { SyncData } from '@/__typings__/app'
import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'
import { PopupMenuItem } from '@/componentsPure/PopupMenu/PopupMenu'

import Tag from './Tag'
import Tree from './Tree'
import Word from './Word'

export default class App {
  word: Word
  tree: Tree
  tag: Tag

  origin: string = "http://localhost:3000"
  searchingWordName: string = ''
  visibleIframe: boolean = false

  // # right click menu
  rightClickMenuItems: PopupMenuItem[] = []
  rightClickMenuPosition: Position = { x: 0, y: 0 }
  visibleRightClickMenu: boolean = false


  get syncData(): SyncData {
    return {
      words: this.word.words,
      tree : this.tree.tree,
      tags : this.tag.tags,
    }
  }

  get searchingWord(): TypeWord {
    return this.word.getWordByName( this.searchingWordName )
  }

  SET_SEARCHING_WORD_NAME( searchingWordName: string ) { this.searchingWordName = searchingWordName }

  SHOW_IFRAME = () => { this.visibleIframe = true }
  HIDE_IFRAME = () => { this.visibleIframe = false }
  TOOGLE_IFRAME = () => { this.visibleIframe = ! this.visibleIframe }

  // # right click menu
  SET_RIGHT_CLICK_MENU_ITEMS = ( items: PopupMenuItem[] ) => { this.rightClickMenuItems = items }
  SET_RIGHT_CLICK_MENU_POSITION = ( position: Position ) => { this.rightClickMenuPosition = position }
  SHOW_RIGHT_CLICK_MENU = () => { this.visibleRightClickMenu = true }
  HIDE_RIGHT_CLICK_MENU = () => { this.visibleRightClickMenu = false }

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
    this.word.deleteWordByName( this.searchingWordName )
  }

  loadPulledData( data: SyncData ) {
    this.word.SET_WORDS( data.words )
    this.tree.SET_TREE( data.tree )
    this.tag.SET_TAGS( data.tags )
  }

  // # right click menu
  showRightClickMenu( items: PopupMenuItem[], event: MouseEvent ) {
   this.SET_RIGHT_CLICK_MENU_ITEMS( items ) 
   event != null && this.SET_RIGHT_CLICK_MENU_POSITION( { x: event.clientX, y: event.clientY } )
   this.SHOW_RIGHT_CLICK_MENU()
  }
}