import Delta from 'quill-delta'

import { TypeId } from '@/__typings__'
import { ReviewLevel } from '@/__typings__/review'
import {
  TypeWord, TypeWordNextReviewTime, TypeWordNote, TypeWordReviewLevel, TypeWordMap
} from '@/__typings__/word'
import { removeArrayElement } from '@/utils/js'
import { DictDataWord, Time } from '@shared/__typings__/DictData'
import {
  standardReviewLevelToDurationMap
} from '@/utils/review/reviewGetters'
import Tag from './Tag'
import Tree from './Tree'

export default class Word {
  tree: Tree;
  tag: Tag;

  words: TypeWord[] = [];
  visibleWordPanel: boolean = true

  wordMap: TypeWordMap = {}

  get ids (): number[] {
    return this.words.map(v => v.id)
  }

  get availableId (): number {
    let num = 0
    while (this.ids.includes(num)) {
      num++
    }
    return num
  }

  get createWord () {
    return (
      name: string,
      config: {
        note?: Delta;
        reviewLevel?: ReviewLevel;
        createTime?: Time;
      }
    ) => ({
      id: this.availableId,
      name,
      note: config.note,
      reviewLevel: config.reviewLevel != null ? config.reviewLevel : 0,
      createTime: new Date().getTime()
    })
  }

  get getWordById (): Function {
    return (id: TypeId): TypeWord => {
      return this.wordMap[id]
      // console.log(this.wordMap[id])
      // return this.wordMap[id] || this.words.find(word => word.id === id)
    }
  }

  get getWordByName (): Function {
    const self = this
    return function (name: string): TypeWord {
      return self.words.find(word => word.name === name)
    }
  }

  SET_WORDS = (words: TypeWord[]) => {
    this.words = words
  };

  REFRESH_WORDS = () => {
    this.words = [...this.words]
  };

  ADD_WORD (word: TypeWord) {
    this.words.push(word)
  }

  DELETE_WORD (word: TypeWord) {
    removeArrayElement(this.words, word)
  }

  // # visibleWordPanel
  TOOGLE_WORD_PANEL () { this.visibleWordPanel = !this.visibleWordPanel }

  // # wordMap
  SET_WORD_MAP = wordMap => { this.wordMap = wordMap }
  SET_WORD_MAP_KEY_VALUE = (key: number, value: TypeWord) => { this.wordMap[key] = value }
  REMOVE_WORD_MAP_KEY = (key: number) => { delete this.wordMap[key] }

  addWord (
    name: string = '',
    config: { note?: Delta; degree?: ReviewLevel; createTime?: Time } = {
      degree: null
    }
  ): TypeWord {
    if (name.trim() === '') {
      alert('Empty word name!')
      return null
    }

    const negativeWord = this.getWordByName(name)
    if (negativeWord != null) {
      alert('Word name exisited!')
      return null
    }
    const newWord: TypeWord = this.createWord(name, config)
    this.ADD_WORD(newWord)
    this.SET_WORD_MAP_KEY_VALUE(newWord.id, newWord)
  }

  deleteWord (word: TypeWord) {
    this.DELETE_WORD(word)
    this.REMOVE_WORD_MAP_KEY(word.id)
    this.tree.DELETE_WORD_ID_RECURVELY_IN_TREE(word.id)
    this.tag.DELETE_WORD_ID_CONSTANTLY_IN_TAGS(word.id)
  }

  deleteWordById (id: TypeId) {
    const word = this.words.find(word => word.id === id)
    this.deleteWord(word)
  }

  deleteWordByName (name) {
    const word = this.words.find(word => word.name === name)
    this.deleteWord(word)
  }

  setWordNote (word: TypeWord, newNote: TypeWordNote) {
    word.note = newNote
    this.REFRESH_WORDS()
  }

  setWordReviewLevel (word: TypeWord, newReviewLevel: TypeWordReviewLevel) {
    word.reviewLevel = newReviewLevel
    this.REFRESH_WORDS()
  }

  refreshWordNextReviewTime (word: TypeWord) {
    const duration = standardReviewLevelToDurationMap[(word.reviewLevel || 0) - 1] || 0
    return new Date().getTime() + duration
  }

  resetWordReviewLevel (word: TypeWord) {
    word.reviewLevel = 0
    this.REFRESH_WORDS()
  }

  setWordNextReviewTime (word: TypeWord, newNextReviewTime: TypeWordNextReviewTime) {
    word.nextReviewTime = newNextReviewTime
    this.REFRESH_WORDS()
  }

  // # wordMap
  updateWordMapByWords () {
    const wordMap = {}
    for (const word of this.words) {
      wordMap[word.id] = word
    }
    this.SET_WORD_MAP(wordMap)
  }
}
