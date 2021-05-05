import { ReviewLevel } from '../../client/src/__typings__/review'
import { NoteData } from '../../client/src/componentsPure/Note/Note'

export { ClientData } from '../../client/src/__typings__/index'

export type DictDataWordReviewLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type DictDataWordNextReviewTime = numebr

export type Time = number

export interface DictDataWord {
  id: number,
  name: string,
  note: NoteData,

  createTime?: number,

  // # review
  reviewLevel?: ReviewLevel
  nextReviewTime?: DictDataWordNextReviewTime
  
  // pronunciation
  p?: string[]
} 


export interface DictInfo {
  
}

export interface DictWord {
  
}

export interface DictData {
  info: DictInfo
  words: DictWord[]
}

