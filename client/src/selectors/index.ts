import { DictDataWord } from "../../../shared/__typings__/DictData"
import { root } from "../entry"
import models from "../models"
import { pick, notNil, isNil } from "../utils/lodash"
import { Tag, ClientData, Tree } from "../__typings__"
import { TreeState, CalcTree } from "../models/tree"
import { AppState } from "../models/app"
import { TagPageState } from "../models/tagPage"


class Selector {
  get state() {
    return root[ "_store" ].getState()
  }

  get storeData() {
    const storeKeys = Object.keys( models )
    const data = pick( root[ "_store" ].getState(), storeKeys )
    return data
  }

  get appState(): AppState {
    return this.state.app
  }

  get mainDataState(): ClientData {
    return this.state.mainData
  }

  get settingState() {
    return this.state.setting
  }

  get treeState(): TreeState {
    return this.state.tree
  }

  get tagPageState(): TagPageState {
    return this.state.tagPage
  }

  // # app section
  get wordCanBeAdded(): boolean {
    const { searching } = this.appState
    const { words } = this.mainDataState
    return (
      searching.trim() !== "" && words.every( ( { name } ) => name !== searching )
    )
  }

  get wordIsAdded(): boolean {
    return !this.wordCanBeAdded
  }

  get shallShowWordPanel() {
    const { searching } = this.appState
    return searching.trim() !== "" && !this.wordCanBeAdded
  }

  // # main data section
  get currentWord(): DictDataWord {
    const { searching } = this.appState
    const { words } = this.mainDataState
    return words.filter( ( { name } ) => name === searching )[ 0 ]
  }

  get currentTags(): Tag[] {
    const { id }  = this.currentWord
    return this.mainDataState.tags.filter( ( { ids } ) => ids.includes( id ) )
  }

  get wordIds(): string[] {
    return this.mainDataState.words.map( ( { id } ) => id ) as string[]
  }

  // tag
  get currentTag(): Tag {
    const { currentTagId } = this.tagPageState
    const { tags } = this.mainDataState
    return tags.filter( tag => tag.id === currentTagId )[ 0 ]
  }

  getWordByWordId( wordId: string ) {
    const { words } = this.mainDataState
    return words.filter( ( { id } ) => id === wordId )[ 0 ]
  }

  getWordByWordName( wordName: string ) {
    return this.mainDataState.words.filter( word => word.name === wordName )[ 0 ]
  }

  getExistsWordName( wordName: string ): boolean {
    return this.mainDataState.words.some( word => word.name === wordName )
  }

  // # setting section
  get server(): string {
    const {
      server,
      isSameHostName,
      port
    } = this.settingState
    return isSameHostName ? `http://${location.hostname}:${port}` : server
  }


  // # tree section
  get currentTree(): Tree {
    const { root, currentTreeId } = this.treeState
    const current: Tree = new CalcTree( root ).getTreeById( currentTreeId )
    return current
  } 

  get currentTreeIdAbove(): string {
    const { root, currentTreeId } = this.treeState
    const treeAbove: Tree = new CalcTree( root ).getTreeAbove( currentTreeId )
    return notNil( treeAbove ) ? treeAbove.id : null
  }

  getTreeAbove = ( id: string ) => {
    const { root } = this.treeState
    const treeAbove = new CalcTree( root ).getTreeAbove( id )
    return treeAbove
  }


  // # tag page section
  get isTagsHome(): boolean {
    const { currentTagId } = this.tagPageState
    return isNil( currentTagId )
  }

}

const selector = new Selector()
export default selector
