import { TypeWord, TypeWordNextReviewTime, TypeWordReviewLevel } from '@/__typings__/word'
import { TIME_ONE_DAY, TIME_ONE_HOUR, TIME_ONE_MINUTE } from '@/constants/numbers'

import { getRandomArrayElement } from '../js'

// # get next standard review word algorithm
export const getNextStandardReviewWord = ( words: TypeWord[] ) => {
  // # words without `reviewLevel`
  const wordsWithoutReviewLevel = words.filter( word => word.reviewLevel == null )
  if ( wordsWithoutReviewLevel.length > 0 ) {
    return getRandomArrayElement( wordsWithoutReviewLevel )
  }

  // # get the word whose next review time
  // # is most earlier than now
  const now = new Date().getTime()
  let targetWord: TypeWord = null
  for ( let word of words ) {
    if ( targetWord == null && word.nextReviewTime <= now ) { targetWord = word; continue }
    if ( word.nextReviewTime <= now && word.nextReviewTime < targetWord.nextReviewTime ) { targetWord = word }
  }

  return targetWord
}


export const standardReviewLevelToDurationMap: { [propName: number]: number } = {
  1: 5 * TIME_ONE_MINUTE,
  2: 30 * TIME_ONE_MINUTE,
  3: 12 * TIME_ONE_HOUR,
  4: 1 * TIME_ONE_DAY,
  5: 2 * TIME_ONE_DAY,
  6: 4 * TIME_ONE_DAY,
  7: 7 * TIME_ONE_DAY,
  8: 15 * TIME_ONE_DAY,
}