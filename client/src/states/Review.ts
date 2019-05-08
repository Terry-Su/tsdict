import { ReviewMode } from '@/__typings__/review'

import App from './App'
import Tree from './Tree'
import Word from './Word'

export default class Review {
  word: Word
  tree: Tree
  app: App
  

  reviewMode: ReviewMode = ReviewMode.None

  get isReviewMode(): boolean {
    return this.reviewMode !== ReviewMode.None
  }

  get randomReviewWordName(): string {
    const targetWords = this.word.words.filter( word => word.note != null )
    const maxIndex = targetWords.length - 1
    const randomIndex = Math.ceil( Math.random() * maxIndex )
    const word = targetWords[ randomIndex ]
    return word.name
  }

  SET_REVIEW_MODE_RANDOM = () => { this.reviewMode = ReviewMode.Random }
  SET_REVIEW_MODE_NONE = () => { this.reviewMode = ReviewMode.None }

  enableReviewModeRandom = () => {
    this.SET_REVIEW_MODE_RANDOM()
    this.tree.HIDE_TREE_PANEL()
    this.app.SET_SEARCHING_WORD_NAME( this.randomReviewWordName )
  }
}