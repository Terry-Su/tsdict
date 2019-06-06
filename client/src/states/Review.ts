import { TypeId } from '@/__typings__'
import {
    ReviewMode, StandardReviewedWordsInfoToday, StandardReviewStat, StandardReviewStatDayMap
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

  reviewdCount: number = 0
  onlyWorksInSelectedTree: boolean = true

  
  // # for random review mode
  reviewedInSelectedTree: TypeId[] = []

  // # for standard review mode
  visibleReviewingWordContent: boolean = false
  standardReviewedWordsInfoToday: StandardReviewedWordsInfoToday = null
  standardStat: StandardReviewStat = null


  get isReviewMode(): boolean {
    return this.reviewMode !== ReviewMode.None
  }

  get isStandardReviewMode(): boolean {
    return this.reviewMode === ReviewMode.Standard
  }

  get reviewingWord(): TypeWord {
    return this.app.searchingWord
  }

  get nextRandomReviewWord(): TypeWord {
    let targetWords = []
    if ( this.onlyWorksInSelectedTree ) {
      targetWords = this.tree.currentSelectedTreeWords.filter( word => ! this.reviewedInSelectedTree.includes( word.id ) )
    } else {
      targetWords = this.word.words.filter( word => word.note != null )
    }
    const maxIndex = targetWords.length - 1
    const randomIndex = Math.ceil( Math.random() * maxIndex )
    const word = targetWords[ randomIndex ]
    if ( word != null ) {
      return word
    } else {
      return null
    }
  }

  // # standard review
  get nextStandardReviewWord(): TypeWord {
    let possibleWords = this.onlyWorksInSelectedTree ? this.tree.currentSelectedTreeWords : this.word.words.filter( word => word.note != null )
    return getNextStandardReviewWord( possibleWords )
  }

  SET_REVIEW_MODE_RANDOM = () => { this.reviewMode = ReviewMode.Random }
  SET_REVIEW_MODE_STANDARD = () => { this.reviewMode = ReviewMode.Standard }
  SET_REVIEW_MODE_NONE = () => { this.reviewMode = ReviewMode.None }

  INCREMENT_REVIEWD_COUNT = () => { this.reviewdCount = this.reviewdCount + 1 }
  ENABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  DISABLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = true }
  TOOGLE_ONLY_WORKS_IN_SELECTED_TREE = () => { this.onlyWorksInSelectedTree = ! this.onlyWorksInSelectedTree }

  RESET_REVIEWD_IN_SELECTED_TREE = () => { this.reviewedInSelectedTree = [] }
  ADD_REVIEWED_IN_SELECTED_TREE = ( wordId: TypeId ) => { this.reviewedInSelectedTree.push( wordId ) }
  REMOVE_REVIEWED_IN_SELECTED_TREE = ( wordId: TypeId ) => { removeArrayElement( this.reviewedInSelectedTree, wordId )  }

  SHOW_REVIEWING_WORD_CONTENT = () => { this.visibleReviewingWordContent = true }
  HIDE_REVIEWING_WORD_CONTENT = () => { this.visibleReviewingWordContent = false }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY = ( info: StandardReviewedWordsInfoToday ) => { this.standardReviewedWordsInfoToday = info }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_TODAY = ( time: string ) => { this.standardReviewedWordsInfoToday.today = time }
  SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS = ( wordIds: TypeId[] ) => { this.standardReviewedWordsInfoToday.wordIds = wordIds }
  ENSURE_STANDARD_REVIEWED_WORDS_INFO_TODAY = () => { if ( this.standardReviewedWordsInfoToday == null ) { this.standardReviewedWordsInfoToday = { today: getDateDayString( new Date() ), wordIds: [] } } }

  SET_STANDARD_STAT = ( stat: StandardReviewStat ) => { this.standardStat = stat }
  SET_STANDARD_STAT_DAY_MAP = ( dayMap: StandardReviewStatDayMap ) => { this.standardStat.dayMap = dayMap }
  ENSURE_STANDARD_STAT = () => { if ( this.standardStat == null ) { this.standardStat = { dayMap: {} } } }

  addReviewedInSelectedTree = ( wordId: TypeId  ) => {
    if ( ! this.reviewedInSelectedTree.includes( wordId ) ) {
      if ( this.reviewedInSelectedTree.length + 1 === this.tree.currentSelectedTreeWordIds.length ) {
        this.RESET_REVIEWD_IN_SELECTED_TREE()
        this.ADD_REVIEWED_IN_SELECTED_TREE( wordId )
      } else {
        this.ADD_REVIEWED_IN_SELECTED_TREE( wordId )
      }
    }
  }

  reviewRandom = () => {
    this.reviewMode !== ReviewMode.Random && this.SET_REVIEW_MODE_RANDOM()
    const { nextRandomReviewWord } = this
    if ( nextRandomReviewWord != null ) {
      this.app.SET_SEARCHING_WORD_NAME( nextRandomReviewWord.name )
      this.addReviewedInSelectedTree( nextRandomReviewWord.id )
    }
  }

  // # standard review mode
  startStandardReview() {
    const { nextStandardReviewWord } = this
    if ( nextStandardReviewWord != null ) {
      this.app.SET_SEARCHING_WORD_NAME( nextStandardReviewWord.name )
      this.SET_REVIEW_MODE_STANDARD()
      this.HIDE_REVIEWING_WORD_CONTENT()
    } else {
      alert( 'No words to review temporarily' )
    }
  }

  switchToNextStandardReviewWord() {
    const { nextStandardReviewWord } = this
    if ( nextStandardReviewWord != null ) {
      this.app.SET_SEARCHING_WORD_NAME( nextStandardReviewWord.name )
      this.HIDE_REVIEWING_WORD_CONTENT()
    } else {
      alert( 'No words to review temporarily' )
      this.SET_REVIEW_MODE_NONE()
    }
  }

  ensureStandardReviewWordReviewLevel() {
    const { reviewingWord } = this
    const { reviewLevel } = this.reviewingWord
    if ( reviewLevel == null ) {
      this.word.resetWordReviewLevel( this.reviewingWord )  
    }
  }


  addWordToStandardReviewedWordsInfoToday( word ) {
    this.ENSURE_STANDARD_REVIEWED_WORDS_INFO_TODAY()
    const { standardReviewedWordsInfoToday } = this
    const today = getDateDayString( new Date() )
    if ( standardReviewedWordsInfoToday.today === today ) {
      // # same day
      const { wordIds } = standardReviewedWordsInfoToday
      const newWordsIds = wordIds.includes( word.id ) ? wordIds : [ ...wordIds, word.id ]
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS( newWordsIds )
    } else {
      // # different day
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_TODAY( today )
      const newWordsIds = [ word.id ]
      this.SET_STANDARD_REVIEWED_WORDS_INFO_TODAY_WORD_IDS( newWordsIds )
    }
  }

  updateStandardReviewStat() {
    this.ENSURE_STANDARD_STAT()
    const { standardReviewedWordsInfoToday } = this
    const { dayMap: defaultDayMap } = this.standardStat
    if ( standardReviewedWordsInfoToday != null ) {
      const { today, wordIds } = standardReviewedWordsInfoToday
      const dayMap: StandardReviewStatDayMap = {
        ...defaultDayMap,
        [ today ]: {
          count: wordIds.length,
        },
      }
      this.SET_STANDARD_STAT_DAY_MAP( dayMap )
    }
  }

  updateStandardReviewWordNextReviewTime() {
    const { reviewingWord } = this
    const now = new Date().getTime()
    const { reviewLevel: level } = this.reviewingWord
    const duration = ( standardReviewLevelToDurationMap[ level  ] || 0 )
    const newNextReviewTime = now + duration
    this.word.setWordNextReviewTime( reviewingWord, newNextReviewTime )
  }

  standardReviewWordFamiliar() {
    const { reviewingWord } = this
    const { reviewLevel } = reviewingWord
    if ( reviewLevel == null ) {
      this.ensureStandardReviewWordReviewLevel()
    } else {
      const newReviewLevel = reviewLevel < MAX_WORD_REVIEW_LEVEL ? ( reviewLevel + 1 ) : reviewLevel
      this.word.setWordReviewLevel( reviewingWord, newReviewLevel as TypeWordReviewLevel )
    }
    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday( reviewingWord )
    this.updateStandardReviewStat()

    this.switchToNextStandardReviewWord()
  }

  standardReviewWordKnown() {
    const { reviewingWord } = this

    this.ensureStandardReviewWordReviewLevel()
    
    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday( reviewingWord )
    this.updateStandardReviewStat()

    this.switchToNextStandardReviewWord()
  }

  standardReviewWordUnfamiliar() {
    const { reviewingWord } = this
    this.word.resetWordReviewLevel( reviewingWord )  

    this.updateStandardReviewWordNextReviewTime()

    // # stat
    this.addWordToStandardReviewedWordsInfoToday( reviewingWord )
    this.updateStandardReviewStat()
    
    this.switchToNextStandardReviewWord()
  }
}