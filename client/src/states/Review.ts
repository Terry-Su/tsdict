import { TypeId } from '@/__typings__'
import {
  ReviewMode, ReviewWordReviewedType, ReviewWordWhetherWithNoteType,
  StandardReviewedWordsInfoToday, StandardReviewStat, StandardReviewStatDayMap
} from '@/__typings__/review'
import { TypeWord, TypeWordReviewLevel } from '@/__typings__/word'
import { MAX_WORD_REVIEW_LEVEL, TIME_ONE_MINUTE } from '@/constants/numbers'
import { getDateDayString, removeArrayElement } from '@/utils/js'
import {
  getNextStandardReviewWord, standardReviewLevelToDurationMap
} from '@/utils/review/reviewGetters'

import App from './App'
import Tree from './Tree'
import Word from './Word'

export default class Review {
  word: Word
  tree: Tree
  app: App

  reviewMode: ReviewMode = ReviewMode.None
  reviewWordReviewedType: ReviewWordReviewedType = ReviewWordReviewedType.REVIEWED_AND_NOT_REVIEWED
  reviewWordWhetherWithNoteType: ReviewWordWhetherWithNoteType = ReviewWordWhetherWithNoteType.WITH_AND_WITHOUT

  onlyWorksInSelectedTree: boolean = true

  reviewdCount: number = 0

  // # for random review mode
  reviewedInSelectedTree: TypeId[] = []

  // # for standard review mode
  visibleReviewingWordContent: boolean = false
  standardReviewedWordsInfoToday: StandardReviewedWordsInfoToday = null
  standardStat: StandardReviewStat = null

  get isReviewMode (): boolean {
    return this.reviewMode !== ReviewMode.None
  }

  get isStandardReviewMode (): boolean {
    return this.reviewMode === ReviewMode.Standard
  }

  get reviewingWord (): TypeWord {
    return this.app.searchingWord
  }

  get potentialReivewWords (): TypeWord[] {
    const res1 = this.onlyWorksInSelectedTree ? this.tree.currentSelectedTreeRecursivelyChildrenWords : this.word.words
    const T1 = ReviewWordWhetherWithNoteType
    const res2Map = {
      [T1.WITH_AND_WITHOUT]: res1,
      [T1.WITH]: res1.filter(word => word.note != null),
      [T1.WITHOUT]: res1.filter(word => word.note == null)
    }
    const res2 = res2Map[this.reviewWordWhetherWithNoteType]
    const T2 = ReviewWordReviewedType
    const res3Map = {
      [T2.REVIEWED_AND_NOT_REVIEWED]: res2,
      [T2.REVIEWED]: res2.filter(word => word.reviewLevel != null),
      [T2.NOT_REVIEWED]: res2.filter(word => word.reviewLevel == null)
    }
    const res3 = res3Map[this.reviewWordReviewedType]
    return res3
  }

  get nextRandomReviewWord (): TypeWord {
    const { potentialReivewWords } = this
    const maxIndex = potentialReivewWords.length - 1
    const randomIndex = Math.ceil(Math.random() * maxIndex)
    const word = potentialReivewWords[randomIndex]
    if (word != null) {
      return word
    } else {
      return null
    }
  }

  // # standard review
  get nextStandardReviewWord (): TypeWord {
    return getNextStandardReviewWord(this.potentialReivewWords)
  }

  get wordsReviewCountInfo () {
    let notReviewedWordsCount = 0
    let reviewingWordsCount = 0
    let familiarWordsCount = 0
    for (const word of this.word.words) {
      const { reviewLevel } = word
      if (reviewLevel == null) { notReviewedWordsCount++ } else if (reviewLevel < 5) { reviewingWordsCount++ } else { familiarWordsCount++ }
    }
    const { length: total } = this.word.words
    return {
      total,
      notReviewedWordsCount,
      reviewingWordsCount,
      familiarWordsCount
    }
  }

  // # reviewWordReviewedType
  get reviewWordReviewedTypeText () {
    const T = ReviewWordReviewedType
    const textMap = {
      [T.REVIEWED]: 'Reviewing the Reviewed',
      [T.NOT_REVIEWED]: 'Reviewing the Not Reviewed',
      [T.REVIEWED_AND_NOT_REVIEWED]: 'Reviewing Both the Reviewd and the Not Reviewed'
    }
    return textMap[this.reviewWordReviewedType]
  }

  // # reviewWordWhetherWithNoteType
  get reviewWordWhetherWithNoteTypeText () {
    const T = ReviewWordWhetherWithNoteType
    const textMap = {
      [T.WITH]: 'Reviewing Words with Note',
      [T.WITHOUT]: 'Reviewing Words without Note',
      [T.WITH_AND_WITHOUT]: 'Reviewing Words with or without Note'
    }
    return textMap[this.reviewWordWhetherWithNoteType]
  }

  SET_REVIEW_MODE_RANDOM = () => { this.reviewMode = ReviewMode.Random }
  SET_REVIEW_MODE_STANDARD = () => { this.reviewMode = ReviewMode.Standard }
  SET_REVIEW_MODE_NONE = () => { this.reviewMode = ReviewMode.None }

  INCREMENT_REVIEWD_COUNT = () => { this.reviewdCount = this.reviewdCount + 1 }
  ENABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  DISABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  TOOGLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = !this.onlyWorksInSelectedTree }

  // # reviewWordReviewedTypeText
  SET_REVIEW_WORD_REVIEWED_TYPE = (type: ReviewWordReviewedType) => { this.reviewWordReviewedType = type }

  // # reviewWordWhetherWithNoteType
  SET_REVIEW_WORD_WHETHER_WITH_NOTE_TYPE = (type: ReviewWordWhetherWithNoteType) => { this.reviewWordWhetherWithNoteType = type }

  RESET_REVIEWD_IN_SELECTED_TREE = () => { this.reviewedInSelectedTree = [] }
  ADD_REVIEWED_IN_SELECTED_TREE = (wordId: TypeId) => { this.reviewedInSelectedTree.push(wordId) }
  REMOVE_REVIEWED_IN_SELECTED_TREE = (wordId: TypeId) => { removeArrayElement(this.reviewedInSelectedTree, wordId) }

  SHOW_REVIEWING_WORD_CONTENT = () => { this.visibleReviewingWordContent = true }
  HIDE_REVIEWING_WORD_CONTENT = () => { this.visibleReviewingWordContent = false }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY = (info: StandardReviewedWordsInfoToday) => { this.standardReviewedWordsInfoToday = info }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_TODAY = (time: string) => { this.standardReviewedWordsInfoToday.today = time }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS = (wordIds: TypeId[]) => { this.standardReviewedWordsInfoToday.wordIds = wordIds }
  ENSURE_STANDARD_REVIEWED_WORDS_INFO_TODAY = () => { if (this.standardReviewedWordsInfoToday == null) { this.standardReviewedWordsInfoToday = { today: getDateDayString(new Date()), wordIds: [] } } }

  SET_STANDARD_STAT = (stat: StandardReviewStat) => { this.standardStat = stat }
  SET_STANDARD_STAT_DAY_MAP = (dayMap: StandardReviewStatDayMap) => { this.standardStat.dayMap = dayMap }
  ENSURE_STANDARD_STAT = () => { if (this.standardStat == null) { this.standardStat = { dayMap: {} } } }

  addReviewedInSelectedTree = (wordId: TypeId) => {
    if (!this.reviewedInSelectedTree.includes(wordId)) {
      if (this.reviewedInSelectedTree.length + 1 === this.tree.currentSelectedTreeWordIds.length) {
        this.RESET_REVIEWD_IN_SELECTED_TREE()
        this.ADD_REVIEWED_IN_SELECTED_TREE(wordId)
      } else {
        this.ADD_REVIEWED_IN_SELECTED_TREE(wordId)
      }
    }
  }

  reviewRandom = () => {
    this.reviewMode !== ReviewMode.Random && this.SET_REVIEW_MODE_RANDOM()
    const { nextRandomReviewWord } = this
    if (nextRandomReviewWord != null) {
      this.app.SET_SEARCHING_WORD_NAME(nextRandomReviewWord.name)
      this.addReviewedInSelectedTree(nextRandomReviewWord.id)
    }
  }

  // # standard review mode
  startStandardReview () {
    const { nextStandardReviewWord } = this
    if (nextStandardReviewWord != null) {
      this.app.SET_SEARCHING_WORD_NAME(nextStandardReviewWord.name)
      this.SET_REVIEW_MODE_STANDARD()
      this.HIDE_REVIEWING_WORD_CONTENT()
      this.tree.HIDE_TREE_PANEL()
      this.app.pronunceSearchingWord()
    } else {
      alert('No words to review temporarily')
    }
  }

  switchToNextStandardReviewWord () {
    const { nextStandardReviewWord } = this
    if (nextStandardReviewWord != null) {
      this.app.SET_SEARCHING_WORD_NAME(nextStandardReviewWord.name)
      this.HIDE_REVIEWING_WORD_CONTENT()
      this.app.pronunceSearchingWord()
    } else {
      alert('No words to review temporarily')
      this.SET_REVIEW_MODE_NONE()
    }
  }

  ensureStandardReviewWordReviewLevel () {
    const { reviewingWord } = this
    const { reviewLevel } = this.reviewingWord
    if (reviewLevel == null) {
      this.word.resetWordReviewLevel(this.reviewingWord)
    }
  }

  addWordToStandardReviewedWordsInfoToday (word) {
    this.ENSURE_STANDARD_REVIEWED_WORDS_INFO_TODAY()
    const { standardReviewedWordsInfoToday } = this
    const today = getDateDayString(new Date())
    if (standardReviewedWordsInfoToday.today === today) {
      // # same day
      const { wordIds } = standardReviewedWordsInfoToday
      const newWordsIds = wordIds.includes(word.id) ? wordIds : [...wordIds, word.id]
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS(newWordsIds)
    } else {
      // # different day
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_TODAY(today)
      const newWordsIds = [word.id]
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS(newWordsIds)
    }
  }

  updateStandardReviewStat () {
    this.ENSURE_STANDARD_STAT()
    const { standardReviewedWordsInfoToday } = this
    const { dayMap: defaultDayMap } = this.standardStat
    if (standardReviewedWordsInfoToday != null) {
      const { today, wordIds } = standardReviewedWordsInfoToday
      const dayMap: StandardReviewStatDayMap = {
        ...defaultDayMap,
        [today]: {
          count: wordIds.length
        }
      }
      this.SET_STANDARD_STAT_DAY_MAP(dayMap)
    }
  }

  updateStandardReviewWordNextReviewTime () {
    const { reviewingWord } = this
    const now = new Date().getTime()
    const { reviewLevel: level } = this.reviewingWord
    const duration = (standardReviewLevelToDurationMap[level] || 0)
    const newNextReviewTime = now + duration
    this.word.setWordNextReviewTime(reviewingWord, newNextReviewTime)
  }

  standardReviewWordFamiliar () {
    const { reviewingWord } = this
    const { reviewLevel } = reviewingWord
    if (reviewLevel == null) {
      this.ensureStandardReviewWordReviewLevel()
    } else {
      const newReviewLevel = reviewLevel < MAX_WORD_REVIEW_LEVEL ? (reviewLevel + 1) : reviewLevel
      this.word.setWordReviewLevel(reviewingWord, newReviewLevel as TypeWordReviewLevel)
    }
    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday(reviewingWord)
    this.updateStandardReviewStat()

    this.switchToNextStandardReviewWord()
  }

  standardReviewWordKnown () {
    const { reviewingWord } = this

    this.ensureStandardReviewWordReviewLevel()

    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday(reviewingWord)
    this.updateStandardReviewStat()

    this.switchToNextStandardReviewWord()
  }

  standardReviewWordUnfamiliar () {
    const { reviewingWord } = this
    this.word.resetWordReviewLevel(reviewingWord)

    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday(reviewingWord)
    this.updateStandardReviewStat()

    this.switchToNextStandardReviewWord()
  }

  // # reviewWordReviewedType
  switchReviewWOrdReviewedType () {
    const { reviewWordReviewedType: t } = this
    const T = ReviewWordReviewedType
    if (t === T.REVIEWED_AND_NOT_REVIEWED) { this.SET_REVIEW_WORD_REVIEWED_TYPE(T.REVIEWED) } else if (t === T.REVIEWED) { this.SET_REVIEW_WORD_REVIEWED_TYPE(T.NOT_REVIEWED) } else if (t === T.NOT_REVIEWED) { this.SET_REVIEW_WORD_REVIEWED_TYPE(T.REVIEWED_AND_NOT_REVIEWED) }
  }

  // # reviewWordReviewedType
  switchReviewWordWhetherWithNoteType () {
    const { reviewWordWhetherWithNoteType: t } = this
    const T = ReviewWordWhetherWithNoteType
    if (t === T.WITH_AND_WITHOUT) { this.SET_REVIEW_WORD_WHETHER_WITH_NOTE_TYPE(T.WITH) } else if (t === T.WITH) { this.SET_REVIEW_WORD_WHETHER_WITH_NOTE_TYPE(T.WITHOUT) } else if (t === T.WITHOUT) { this.SET_REVIEW_WORD_WHETHER_WITH_NOTE_TYPE(T.WITH_AND_WITHOUT) }
  }
}
