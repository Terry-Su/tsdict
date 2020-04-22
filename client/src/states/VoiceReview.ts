import Review from './Review'
import { TypeWord, TypeWordReviewLevel } from '@/__typings__/word'
import { standardReviewLevelToDurationMap } from '@/utils/review/reviewGetters'
import Word from './Word'
import { MAX_WORD_REVIEW_LEVEL } from '@/constants/numbers'
import Audio from './Audio'
import App from './App'

export default class VoiceReview {
  app: App
  review: Review
  word: Word
  audio: Audio

  voiceReviewingWord: TypeWord = null

  get nextWord (): TypeWord {
    return this.review.nextStandardReviewWord
  }

  SET_VOICE_REVIEWING_WORD (word: TypeWord) { this.voiceReviewingWord = word }

  reviewNextWord = () => {
    const { nextWord } = this
    if (nextWord == null) {
      alert('No words to review temporarily')
      this.review.exitReview()
      return
    }

    this.SET_VOICE_REVIEWING_WORD(nextWord)
    this.speakCurrentWordName()

    this.app.SET_SEARCHING_WORD_NAME(nextWord.name)
  }

  speakCurrentWordName = () => {
    this.audio.play(this.voiceReviewingWord.name)
  }

  knowCurrentWord = () => {
    const { voiceReviewingWord } = this

    // # stat
    this.review.addWordToStandardReviewedWordsInfoToday(voiceReviewingWord)
    this.review.updateStandardReviewStat()

    // # update review level
    if (voiceReviewingWord.reviewLevel == null) {
      this.word.resetWordReviewLevel(voiceReviewingWord)
    }
    const newReviewLevel = voiceReviewingWord.reviewLevel < MAX_WORD_REVIEW_LEVEL ? (voiceReviewingWord.reviewLevel + 1) : voiceReviewingWord.reviewLevel
    this.word.setWordReviewLevel(this.voiceReviewingWord, newReviewLevel as TypeWordReviewLevel)

    this.updateCurrentNextReviewTime()
    this.reviewNextWord()
  }

  updateCurrentNextReviewTime () {
    const now = new Date().getTime()
    const { reviewLevel: level = 1 } = this.voiceReviewingWord
    const duration = (standardReviewLevelToDurationMap[level] || 0)
    const newNextReviewTime = now + duration
    this.word.setWordNextReviewTime(this.voiceReviewingWord, newNextReviewTime)
  }
}
