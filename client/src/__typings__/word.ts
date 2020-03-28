import Delta from 'quill-delta'

import {
  DictDataWord, DictDataWordNextReviewTime, DictDataWordReviewLevel
} from '@shared/__typings__/DictData'

export type TypeWord = DictDataWord

export type TypeWordNote = Delta

export type TypeWordReviewLevel = DictDataWordReviewLevel

export type TypeWordNextReviewTime = DictDataWordNextReviewTime

export type TypeWordMap = {
    [id: number]: TypeWord
}
