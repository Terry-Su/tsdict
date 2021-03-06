import { isNil, pick } from 'lodash'

import { Tag, Tree } from '@/__typings__'
import { root } from '@/entry'
import models from '@/models'
import { AppState } from '@/models/app'
import { CalcTree, CoreState } from '@/models/core'
import { TagPageState } from '@/models/tagPage'
import { TreePageState } from '@/models/treePage'
import { TreePageAddDialogState } from '@/models/treePageAddDialog'
import { TreePageSelectTreeDialogState } from '@/models/treePageSelectTreeDialog'
import { WordPageState } from '@/models/wordPage'
import { sortWords } from '@/shared/reorganizeItems'
import { notNil } from '@/utils/lodash'
import { DictDataWord } from '@shared/__typings__/DictData'

class Selector {
  get state() {
    return root[ "_store" ].getState()
  }

  get storeData() {
    const storeKeys = Object.keys( models )
    const data = pick( root[ "_store" ].getState(), storeKeys )
    return data
  }

  get coreState(): CoreState {
    return this.state.core
  }

  get appState(): AppState {
    return this.state.app
  }

  get settingState() {
    return this.state.setting
  }

  get treePageState(): TreePageState {
    return this.state.treePage
  }
  
  get treePageAddDialogState(): TreePageAddDialogState {
    return this.state.treePageAddDialog
  }

  get treePageSelectTreeDialogState(): TreePageSelectTreeDialogState {
    return this.state.treePageSelectTreeDialog
  }

  get tagPageState(): TagPageState {
    return this.state.tagPage
  }

  get wordPageState(): WordPageState {
    return this.state.wordPage
  }

  // # core section
  get currentWord(): DictDataWord {
    const { searching } = this.appState
    const { words } = this.coreState
    return words.filter( ( { name } ) => name === searching )[ 0 ]
  }

  get currentTags(): Tag[] {
    const { id }  = this.currentWord
    return this.coreState.tags.filter( ( { ids } ) => ids.includes( id ) )
  }

  get wordIds(): string[] {
    return this.coreState.words.map( ( { id } ) => id )
  }

  get reorganizedWordIds(): string[] {
    const sortedWords = sortWords( this.coreState.words )
    return sortedWords.map( v => v.id )
  }

  get wordNames(): string[] {
    return this.coreState.words.map( ( { name } ) => name )
  }


  getWordByWordId( wordId: string ) {
    const { words } = this.coreState
    return words.filter( ( { id } ) => id === wordId )[ 0 ]
  }

  getWordByWordName( wordName: string ) {
    return this.coreState.words.filter( word => word.name === wordName )[ 0 ]
  }

  getExistsWordName( wordName: string ): boolean {
    return this.coreState.words.some( word => word.name === wordName )
  }

  getWordTags( wordId: string ): Tag[] {
    const { tags = [] } = this.coreState
    return tags.filter( tag => tag.ids.includes( wordId ) )
  }

  get rootTree(): Tree {
    return this.coreState.tree
  }

  // ## tag
  get tagNames(): string[] {
    return this.coreState.tags.map( tag => tag.name )
  }
  
  get currentTag(): Tag {
    const { currentTagId } = this.tagPageState
    const { tags } = this.coreState
    return tags.filter( tag => tag.id === currentTagId )[ 0 ]
  }

  getTagByTagId( tagId: string ) {
    const { tags } = this.coreState
    return tags.filter( ( { id } ) => id === tagId )[ 0 ]
  }

  getTagByTagName( tagName: string ) {
    const { tags } = this.coreState
    return tags.filter( ( { name } ) => name === tagName )[ 0 ]
  }


  // # app section
  get wordCanBeAdded(): boolean {
    const { searching } = this.appState
    const { words } = this.coreState
    return (
      searching.trim() !== "" && words.every( ( { name } ) => name !== searching )
    )
  }

  get wordIsAdded(): boolean {
    const { searching } = this.appState
    return !this.wordCanBeAdded && searching.trim() !== ""
  }

  get shallShowWordPanel() {
    const { searching } = this.appState
    return searching.trim() !== "" && !this.wordCanBeAdded
  }

  get canSwitchWord() {
    return this.appState.activeWordIds.length > 0
  }

  



  // # setting section
  get server(): string {
    const {
      server,
      isSameHostName,
      port,
    } = this.settingState
    return isSameHostName ? `http://${location.hostname}:${port}` : server
  }


  // # tree page section
  get isTreePage() {
    return this.treePageState.currentTreeId != null
  }
  get currentTree(): Tree {
    const { currentTreeId } = this.treePageState
    const current: Tree = new CalcTree( this.rootTree ).getTreeById( currentTreeId ) || this.rootTree
    return current
  } 

  get currentTreeIdAbove(): string {
    const { currentTreeId } = this.treePageState
    const treeAbove: Tree = new CalcTree( this.rootTree ).getTreeAbove( currentTreeId )
    return notNil( treeAbove ) ? treeAbove.id : null
  }

  getTreeAbove = ( id: string ) => {
    const treeAbove = new CalcTree( this.rootTree ).getTreeAbove( id )
    return treeAbove
  }


  // # tag page section
  get isTagsHome(): boolean {
    const { currentTagId } = this.tagPageState
    return isNil( currentTagId )
  }

  // # word page section
}

const selector = new Selector()
export default selector
