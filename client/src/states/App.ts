import { Position, TypeTag } from '@/__typings__'
import { SyncData } from '@/__typings__/app'
import { TypeWord, TypeWordNote, TypeWordReviewLevel } from '@/__typings__/word'
import download from '@/assets/js/download'
import { PopupMenuItem } from '@/componentsPure/PopupMenu/PopupMenu'
import appApi from '@/services/modules/appApi'

import Iframe from './Iframe'
import Message from './Message'
import Review from './Review'
import Setting from './Setting'
import Tag from './Tag'
import Tree from './Tree'
import Word from './Word'

export default class App {
  word: Word;
  tree: Tree;
  tag: Tag;
  review: Review;
  iframe: Iframe
  setting: Setting
  message: Message

  searchingWordName: string = '';
  visibleIframe: boolean = true;

  // # right click menu
  rightClickMenuItems: PopupMenuItem[] = [];
  rightClickMenuPosition: Position = { x: 0, y: 0 };
  visibleRightClickMenu: boolean = false;

  // # popup mode
  isPopupDictMode: boolean = false

  // # pronunciation player
  pronunciationPlayer = null

  // # dev book mode
  isDevBookMode: boolean = false

  get syncData (): SyncData {
    return {
      words: this.word.words,
      tree: this.tree.tree,
      tags: this.tag.tags,
      // # app state
      lastSelections: this.tree.lastSelections,
      standardStat: this.review.standardStat,
      standardReviewedWordsInfoToday: this.review.standardReviewedWordsInfoToday,
      iframeLinks: this.iframe.iframeLinks,
      origin: this.setting.origin
    }
  }

  get searchingWord (): TypeWord {
    return this.word.getWordByName(this.searchingWordName)
  }

  get searchWordTags (): TypeTag[] {
    return this.searchingWord != null
      ? this.tag.tags.filter(tag => tag.ids.includes(this.searchingWord.id))
      : []
  }

  get searchWordTagsCanBeAdded (): TypeTag[] {
    return this.tag.tags.filter(tag => !this.searchWordTags.includes(tag))
  }

  SET_SEARCHING_WORD_NAME (searchingWordName: string) {
    this.searchingWordName = searchingWordName
  }

  SHOW_IFRAME = () => {
    this.visibleIframe = true
  };

  HIDE_IFRAME = () => {
    this.visibleIframe = false
  };

  TOOGLE_IFRAME = () => {
    this.visibleIframe = !this.visibleIframe
  };

  // # right click menu
  SET_RIGHT_CLICK_MENU_ITEMS = (items: PopupMenuItem[]) => {
    this.rightClickMenuItems = items
  };

  SET_RIGHT_CLICK_MENU_POSITION = (position: Position) => {
    this.rightClickMenuPosition = position
  };

  SHOW_RIGHT_CLICK_MENU = () => {
    this.visibleRightClickMenu = true
  };

  HIDE_RIGHT_CLICK_MENU = () => {
    this.visibleRightClickMenu = false
  };

  // # popup dict mdoe
  ENABLE_POPUP_DICT_MODE = () => { this.isPopupDictMode = true }
  DISABLE_POPUP_DICT_MODE = () => { this.isPopupDictMode = false }

  // # pronunciation player
  SET_PRONUNCIATION_PLAYER = value => { this.pronunciationPlayer = value }

  // # dev book mode
  ENABLE_DEV_BOOK_MODE = () => { this.isDevBookMode = true }
  DIABLE_DEV_BOOK_MODE = () => { this.isDevBookMode = false }

  addWordBySearchingWordName () {
    this.word.ADD_WORD(this.searchingWordName)
  }

  updateSearchingWordNote (newNote: TypeWordNote) {
    this.word.setWordNote(this.searchingWord, newNote)
  }

  updateSearchingWordReviewLevel (newDegree: TypeWordReviewLevel) {
    this.word.setWordReviewLevel(this.searchingWord, newDegree)
  }

  deleteSearchingWord () {
    this.word.deleteWordByName(this.searchingWordName)
  }

  // # pull and push
  loadSyncData (data: SyncData) {
    this.word.SET_WORDS(data.words)
    this.tree.SET_TREE(data.tree || this.tree.createTree('Root'))
    this.tag.SET_TAGS(data.tags)

    // # app state
    // ## tree
    // ### last selections
    this.tree.setSelections(data.lastSelections || [])

    // ## review
    // ### stat
    this.review.SET_STANDARD_STAT(data.standardStat)
    // ### reviewed words info today
    this.review.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY(data.standardReviewedWordsInfoToday)

    // ## iframe
    data.iframeLinks != null && this.iframe.SET_IFRAME_LINKS(data.iframeLinks)

    // ## setting
    const origin = data.origin != null ? data.origin : location.origin
    this.setting.SET_ORIGIN(origin)
  }

  loadPulledData (data: SyncData) {
    this.loadSyncData(data)
  }

  importDataByDataStr (dataStr: string) {
    const data: SyncData = JSON.parse(dataStr)
    this.loadSyncData(data)
  }

  export () {
    const str = JSON.stringify(this.syncData)
    const fileName = 'tsdict.json'
    download(str, fileName)
  }

  // # right click menu
  showRightClickMenu (items: PopupMenuItem[], event: MouseEvent) {
    this.SET_RIGHT_CLICK_MENU_ITEMS(items)
    event != null &&
      this.SET_RIGHT_CLICK_MENU_POSITION({
        x: event.clientX,
        y: event.clientY
      })
    this.SHOW_RIGHT_CLICK_MENU()
  }

  async saveSearchingWordToCurrentSelectedTree () {
    const { currentSelectedTree } = this.tree
    if (currentSelectedTree != null) {
      if (this.tree.isTreeTree(currentSelectedTree)) {
        this.tree.addTreeWordByName(
          this.searchingWordName,
          currentSelectedTree
        )
      } else if (this.tree.isTagTree(currentSelectedTree)) {
        const tag = this.tag.getTagByName(currentSelectedTree.name)
        this.tag.addTagWordByName(tag, this.searchingWordName)
      }
      if (this.isPopupDictMode) {
        await appApi.push(this.syncData)
        this.message.showMessage('Updates have already pushed to server!')
      }
      return
    } else {
      return alert('No selected folder')
    }
    alert(`Folder: "${currentSelectedTree.name}" cannot be used for saving words`)
  }

  // # pronunciation player
  pronunceSearchingWord () {
    if (this.pronunciationPlayer) {
      this.pronunciationPlayer.load()
      this.pronunciationPlayer.play()
    }
  }
}
