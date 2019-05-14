import { ReviewMode } from '@/__typings__/review'

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

  get isReviewMode(): boolean {
    return this.reviewMode !== ReviewMode.None
  }

  get randomReviewWordName(): string {
    let targetWords = []
    if ( this.onlyWorksInSelectedTree ) {
      targetWords = this.tree.currentSelectedWords
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

  enableReviewModeRandom = () => {
    if ( this.randomReviewWordName != null ) {
      this.app.SET_SEARCHING_WORD_NAME( this.randomReviewWordName )
      // this.tree.HIDE_TREE_PANEL()
      this.SET_REVIEW_MODE_RANDOM()
    }
  }
}