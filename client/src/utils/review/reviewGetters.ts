import { TypeWord, TypeWordNextReviewTime, TypeWordReviewLevel } from '@/__typings__/word'
import {
  MAX_WORD_REVIEW_LEVEL, TIME_ONE_DAY, TIME_ONE_HOUR, TIME_ONE_MINUTE
} from '@/constants/numbers'

import { getRandomArrayElement } from '../js'

// # the algorithm of getting next standard review word
let shouldReviewingNewWord: boolean = false
export const getNextStandardReviewWord = (words: TypeWord[]) => {
  // # words without `reviewLevel`
  const wordsWithoutReviewLevel = []
  const wordsWithReviewLevel = []
  words.forEach(word => {
    if (word.reviewLevel == null) {
      wordsWithoutReviewLevel.push(word)
    } else {
      wordsWithReviewLevel.push(word)
    }
  })
  const existWordsWithoutReviewLevel = wordsWithoutReviewLevel.length > 0
  const existWordsWithReviewLevel = wordsWithReviewLevel.length > 0
  const getTargetWordWithReviewLevel = (words: TypeWord[]) => {
    // # get the word whose next review time
    // # is most earlier than now
    const now = new Date().getTime()
    let targetWord: TypeWord = null
    const filteredWords = words.filter(
      word => word.reviewLevel !== MAX_WORD_REVIEW_LEVEL
    )
    for (const word of filteredWords) {
      // # skip words without qualified review level
      if (word.reviewLevel == null) {
        continue
      }

      // # if word's next review time is null, return it immediately
      if (word.nextReviewTime == null) {
        return word
      }

      if (word.nextReviewTime > now) { continue }

      // # initialize
      if (targetWord == null) {
        targetWord = word
        continue
      }
      // # words with lower level first
      // if ( word.reviewLevel < targetWord.reviewLevel ) {
      //   targetWord = word
      //   continue
      // }
      // # for words with same level, ones with earlier review time first
      if (
        // word.reviewLevel === targetWord.reviewLevel &&
        word.nextReviewTime <= now &&
        word.nextReviewTime >= targetWord.nextReviewTime
      ) {
        targetWord = word
      }
    }
    return targetWord
  }

  if (existWordsWithoutReviewLevel && existWordsWithReviewLevel) {
    if (shouldReviewingNewWord) {
      shouldReviewingNewWord = !shouldReviewingNewWord
      return getRandomArrayElement(wordsWithoutReviewLevel)
    } else {
      shouldReviewingNewWord = !shouldReviewingNewWord
      const potentialTargetWord = getTargetWordWithReviewLevel(
        wordsWithReviewLevel
      )
      if (potentialTargetWord != null) {
        return potentialTargetWord
      } else {
        return getRandomArrayElement(wordsWithoutReviewLevel)
      }
    }
  } else if (existWordsWithoutReviewLevel && !existWordsWithReviewLevel) {
    return getRandomArrayElement(wordsWithoutReviewLevel)
  } else if (!existWordsWithoutReviewLevel && existWordsWithReviewLevel) {
    return getTargetWordWithReviewLevel(wordsWithReviewLevel)
  }

  return null
}

export const standardReviewLevelToDurationMap: {
  [propName: number]: number;
} = {
  1: 5 * TIME_ONE_MINUTE,
  2: 30 * TIME_ONE_MINUTE,
  3: 12 * TIME_ONE_HOUR,
  4: 1 * TIME_ONE_DAY,
  5: 2 * TIME_ONE_DAY,
  6: 4 * TIME_ONE_DAY,
  7: 7 * TIME_ONE_DAY,
  8: 15 * TIME_ONE_DAY,
  9: 30 * TIME_ONE_DAY,
  [MAX_WORD_REVIEW_LEVEL]: 365 * TIME_ONE_DAY
}
