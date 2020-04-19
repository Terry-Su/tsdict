import React, { Component } from 'react'
import styled from 'styled-components'

import { SyncData } from '@/__typings__/app'
import { StandardReviewedWordsInfoToday, StandardReviewStat } from '@/__typings__/review'
import { reduxStore } from '@/entry'
import appApi from '@/services/modules/appApi'
import { Actions, Selectors, States } from '@/utils/decorators'
import { SORT_TYPES } from '@/__typings__/tree'

interface Props { }

@Actions("tree", "SET_TREE", `SET_SORT_TYPE`)
@Actions("word", "SET_WORDS", "TOOGLE_WORD_PANEL", "updateWordMapByWords")
@Actions("tag", "SET_TAGS")
@Actions(
  "app",
  "TOOGLE_IFRAME",
  "ENABLE_DATA_SERVER_AVAILABLE",
  "DISABLE_DATA_SERVER_AVAILABLE",
  "loadPulledData",
  "importDataByDataStr",
  "export"
)
@Actions(
  "review",
  "reviewRandom",
  "startStandardReview",
  "startVoiceReview",
  "SET_REVIEW_MODE_NONE",
  "INCREMENT_REVIEWD_COUNT",
  "TOOGLE_ONLY_WORKS_IN_SELECTED_TREE",
  "switchReviewWOrdReviewedType",
  "switchReviewWordWhetherWithNoteType",
)
@Actions("tree", "TOOGLE_TREE_PANEL")
@Actions("iframe", "SHOW_DIALOG_IFRAME_SETTING")
@Actions("setting", "SHOW_DIALOG_SETTING")
@Selectors(
  "review",
  "isStandardReviewMode",
  "isReviewMode",
  "wordsReviewCountInfo",
  'reviewWordReviewedTypeText',
  'reviewWordWhetherWithNoteTypeText',
)
@Selectors("app", "syncData",)
@States("review",
  "reviewdCount",
  "onlyWorksInSelectedTree",
  "isReviewingWordsWithoutNote",
  "standardStat",
  "standardReviewedWordsInfoToday",
)
@States("tree",
  "sortType",
)
@States( `setting`, `origin` )
@States( `app`, `availableDataServer` )
export default class Toolbar extends Component<Props> {
  origin?: string;
  availableDataServer?: boolean;
  sortType?: SORT_TYPES;
  onlyWorksInSelectedTree?: boolean;
  isReviewingWordsWithoutNote?: boolean;
  syncData?: any;
  reviewdCount?: number;
  isStandardReviewMode?: boolean;
  isReviewMode?: boolean;
  standardReviewedWordsInfoToday?: StandardReviewedWordsInfoToday;
  standardStat?: StandardReviewStat;
  wordsReviewCountInfo?: any;
  reviewWordReviewedTypeText?: any;
  reviewWordWhetherWithNoteTypeText?: any;
  TOOGLE_IFRAME?: Function;
  TOOGLE_TREE_PANEL?: Function;
  TOOGLE_WORD_PANEL?: Function;
  INCREMENT_REVIEWD_COUNT?: Function;
  SET_REVIEW_MODE_NONE?: Function;
  SET_TREE?: Function;
  SET_WORDS?: Function;
  SET_TAGS?: Function;
  TOOGLE_ONLY_WORKS_IN_SELECTED_TREE?: Function;
  SHOW_DIALOG_SETTING?: Function;
  SHOW_DIALOG_IFRAME_SETTING?: Function;
  SET_SORT_TYPE?: Function;
  ENABLE_DATA_SERVER_AVAILABLE?: Function;
  DISABLE_DATA_SERVER_AVAILABLE?: Function;
  loadPulledData?: Function;
  importDataByDataStr?: Function;
  reviewRandom?: Function;
  export?: Function;
  startStandardReview?: Function;
  startVoiceReview?: Function;
  switchReviewWOrdReviewedType?: Function;
  switchReviewWordWhetherWithNoteType?: Function;
  updateWordMapByWords?: Function;

  componentDidMount() {
    this.testDataServerConnection()
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.origin !== this.origin ) {
      this.testDataServerConnection()
    }
  }

  testDataServerConnection = () => {
    appApi.testConnection().then( () => {
      console.log('connected')
      this.ENABLE_DATA_SERVER_AVAILABLE()
    } ).catch( () => {
      console.log('not connected')
      this.DISABLE_DATA_SERVER_AVAILABLE()
    } )
  }

  hanldeImportBatchClick = () => {

  }

  handleClickPull = async () => {
    const confirmResult = confirm('Are your really confirm to pull data from server? Current data will be replaced by pulled data.')
    if (!confirmResult) { return }
    const data: SyncData = await appApi.pull()
    this.loadPulledData(data)
    this.updateWordMapByWords()
    alert('Pulled Successfully!')
  };

  handleClickPush = async () => {
    const confirmResult = confirm('Are you sure to push current data to server?')
    if (!confirmResult) { return }
    await appApi.push(this.syncData)
    alert('Pushed Successfully!')
  };

  handleClickRandomReviewMode = () => {
    this.reviewRandom()
    this.INCREMENT_REVIEWD_COUNT()
  };

  handleStatClick = () => {
    const { dayMap = {} } = this.standardStat || {}
    const { today, wordIds = [] } = this.standardReviewedWordsInfoToday || {}

    let strToday = `Reviewed words today: ${wordIds.length}`

    // # previous reviewed words stat
    let strPrevious = ''
    for (let key in dayMap) {
      const { count } = dayMap[key]
      if (today !== key) {
        strPrevious = `${key.replace(/\-/g, '\/')}: ${count}\n` + strPrevious
      }
    }
    // strPrevious = `Previous:\n${strPrevious}`

    // # words count info
    const {
      notReviewedWordsCount,
      reviewingWordsCount,
      familiarWordsCount,
      total,
    } = this.wordsReviewCountInfo
    const strCountInfo = `Total: ${total}
Not Reviewed: ${ notReviewedWordsCount}
Known: ${ reviewingWordsCount}
Familiar: ${ familiarWordsCount}

Known+Familiar: ${ reviewingWordsCount + familiarWordsCount}
`
    alert(`${strToday}

${strCountInfo}

${strPrevious}`)
  }

  handleImportChange = (event: any) => {
    const fileInput = event.target
    try {
      const reader = new FileReader()

      reader.onload = (event: any) => {
        // Reset value so that uploading file which has 
        // the same name next time still triggers change event
        fileInput.value = ''

        const str = event.target.result
        this.importDataByDataStr(str)
      }
      reader.readAsText(event.target.files[0] )
    } catch (e) { }
  }

  render() {
    return (
      <StyledRoot>
        <button onClick={() => this.TOOGLE_TREE_PANEL()}>Tree Panel</button>
        <button onClick={() => this.TOOGLE_WORD_PANEL()}>Word Panel</button>
        <button onClick={() => this.handleStatClick()}>Statistics</button>
        {!this.isStandardReviewMode && (
          <>
            <button onClick={this.handleClickRandomReviewMode}>
              Random Review{" "}
              {this.reviewdCount >= 2 && (
                <span>(reviewd: {this.reviewdCount - 1})</span>
              )}
            </button>
            <button onClick={() => this.startStandardReview()}>Start Standard Review</button>
            <button onClick={() => this.startVoiceReview()}>Start Voice Review</button>
          </>
        )}
        <button onClick={() => this.switchReviewWOrdReviewedType()}>{this.reviewWordReviewedTypeText}</button>
        <button onClick={() => this.switchReviewWordWhetherWithNoteType()}>{this.reviewWordWhetherWithNoteTypeText}</button>
        {this.isStandardReviewMode && (
          <button onClick={() => this.SET_REVIEW_MODE_NONE()}>
            Exit Standard Review
          </button>
        )}
        <span>
          <span>In Current Selected Tree</span>
          <input
            type="checkbox"
            checked={this.onlyWorksInSelectedTree}
            onChange={() => this.TOOGLE_ONLY_WORKS_IN_SELECTED_TREE()}
          />
        </span>
        <button onClick={() => this.TOOGLE_IFRAME()}>Iframe</button>

        <button onClick={() => this.SHOW_DIALOG_SETTING()}>Setting</button>
        <button onClick={() => this.SHOW_DIALOG_IFRAME_SETTING()}>Iframe Setting</button>
        <select value={this.sortType} onChange={ (e) => { this.SET_SORT_TYPE( +e.target.value ) } }>
          {[
            { label: 'Sort by create time', value: SORT_TYPES.CREATE_TIME },
            { label: 'Sort by level', value: SORT_TYPES.LEVEL },
            { label: 'Sort by letter', value: SORT_TYPES.LETTER }
          ].map((v, index) =>
            <option key={index} value={v.value}>{v.label}</option>
          )}
        </select>

        <button onClick={() => this.export()}>Export</button>

        <label className="importInputLabel">
          <input type="file" className="fileInput" name="upload" onChange={this.handleImportChange} />
          Import
        </label>
        {/* <button>Update Media</button> */}
        <button onClick={this.handleClickPull}>Pull</button>
        <button onClick={this.handleClickPush}>Push</button>
        <div className="connection-status-wrapper">
          <span className={`dot ${this.availableDataServer ? 'available' : ''}`}></span>
        <span className="text">Data server { this.availableDataServer ? 'Available' : 'Unavailable' }</span>
        </div>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  .importInputLabel {
    padding: 2px 4px;
    background: #dfdfdf;
    border: 1px solid grey;
    .fileInput {
      display: none;
    }
  }
  .connection-status-wrapper {
    display: inline-flex;
    align-items: center;
    min-height: 100%;
    margin-left: 10px;
    >.dot {
      width: 6px;
      height: 6px;
      margin-right: 8px;
      border-radius: 50%;
      background: red;
      &.available {
        background: green;
      }
    }
  }
`
