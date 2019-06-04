import { TypeTag, TypeTree } from './'
import { TypeIframeLink } from './iframe'
import { StandardReviewedWordsInfoToday, StandardReviewStat } from './review'
import { TreeSelection } from './tree'
import { TypeWord } from './word'

export interface SyncData {
  words: TypeWord[]
  tree: TypeTree
  tags: TypeTag[]
  // # app state
  // ## app
  lastSelections: TreeSelection[]
  // ## review
  standardStat: StandardReviewStat
  standardReviewedWordsInfoToday: StandardReviewedWordsInfoToday
  // ## iframe
  iframeLinks: TypeIframeLink[]
}