import { TypeId } from '@/__typings__'
import { ReviewMode } from '@/__typings__/review'
import { removeArrayElement } from '@/utils/js'

import App from './App'
import Tree from './Tree'
import Word from './Word'

export default class Review {
  word: Word
  tree: Tree
  app: App
  

  reviewMode: ReviewMode = ReviewMode.None

  reviewdCount: number = 0
  onlyWorksInSelectedTree: boolean = true
  reviewedInSelectedTree: TypeId[] = []

  get isReviewMode(): boolean {
    return this.reviewMode !== ReviewMode.None
  }

  get randomReviewWordName(): string {
    let targetWords = []
    if ( this.onlyWorksInSelectedTree ) {
      targetWords = this.tree.currentSelectedWords.filter( word => ! this.reviewedInSelectedTree.includes( word.id ) )
    } else {
      targetWords = this.word.words.filter( word => word.note != null )
    }
    const maxIndex = targetWords.length - 1
    const randomIndex = Math.ceil( Math.random() * maxIndex )
    const word = targetWords[ randomIndex ]
    if ( word != null ) {
      return word.name
    } else {
      return null
    }
  }

  SET_REVIEW_MODE_RANDOM = () => { this.reviewMode = ReviewMode.Random }
  SET_REVIEW_MODE_NONE = () => { this.reviewMode = ReviewMode.None }

  INCREMENT_REVIEWD_COUNT = () => { this.reviewdCount = this.reviewdCount + 1 }
  ENABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  DISABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  TOOGLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = ! this.onlyWorksInSelectedTree }

  RESET_REVIEWD_IN_SELECTED_TREE = () => { this.reviewedInSelectedTree = [] }
  ADD_REVIEWED_IN_SELECTED_TREE = ( wordId: TypeId ) => { this.reviewedInSelectedTree.push( wordId ) }
  REMOVE_REVIEWED_IN_SELECTED_TREE = ( wordId: TypeId ) => { removeArrayElement( this.reviewedInSelectedTree, wordId )  }

  addReviewedInSelectedTree = ( wordId: TypeId  ) => {
    if ( ! this.reviewedInSelectedTree.includes( wordId ) ) {
      if ( this.reviewedInSelectedTree.length + 1 === this.tree.currentSelectedWordIds.length ) {
        this.RESET_REVIEWD_IN_SELECTED_TREE()
        this.ADD_REVIEWED_IN_SELECTED_TREE( wordId )
      } else {
        this.ADD_REVIEWED_IN_SELECTED_TREE( wordId )
      }
    }
  }

  reviewRandom = () => {
    this.reviewMode !== ReviewMode.Random && this.SET_REVIEW_MODE_RANDOM()
    const { randomReviewWordName } = this
    if ( randomReviewWordName != null ) {
      this.app.SET_SEARCHING_WORD_NAME( randomReviewWordName )
      const word = this.word.getWordByName( randomReviewWordName )
      this.addReviewedInSelectedTree( word.id )
    }
  }
}