import React, { Component } from 'react'
import styled from 'styled-components'

import { SyncData } from '@/__typings__/app'
import { reduxStore } from '@/entry'
import appApi from '@/services/modules/appApi'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {}

@Actions( "tree", "SET_TREE" )
@Actions( "word", "SET_WORDS" )
@Actions( "tag", "SET_TAGS" )
@Actions(
  "app",
  "TOOGLE_IFRAME",
  "loadPulledData",
  "saveSearchingWordToCurrentSelectedTree",
  "export"
)
@Actions(
  "review",
  "reviewRandom",
  "startStandardReview",
  "SET_REVIEW_MODE_NONE",
  "INCREMENT_REVIEWD_COUNT",
  "TOOGLE_ONLY_WORKS_IN_SELECTED_TREE",
)
@Actions( "tree", "TOOGLE_TREE_PANEL" )
@Selectors( "review", "isStandardReviewMode" )
@Selectors( "app", "syncData" )
@States( "review", "reviewdCount", "onlyWorksInSelectedTree" )
export default class Toolbar extends Component<Props> {
  onlyWorksInSelectedTree?: boolean;
  syncData?: any;
  reviewdCount?: number;
  isStandardReviewMode?: boolean;
  TOOGLE_IFRAME?: Function;
  TOOGLE_TREE_PANEL?: Function;
  INCREMENT_REVIEWD_COUNT?: Function;
  SET_REVIEW_MODE_NONE?: Function;
  SET_TREE?: Function;
  SET_WORDS?: Function;
  SET_TAGS?: Function;
  TOOGLE_ONLY_WORKS_IN_SELECTED_TREE?: Function;
  loadPulledData?: Function;
  reviewRandom?: Function;
  saveSearchingWordToCurrentSelectedTree?: Function;
  export?: Function;
  startStandardReview?: Function;

  handleClickPull = async () => {
    const data: SyncData = await appApi.pull()
    this.loadPulledData( data )
  };

  handleClickPush = async () => {
    appApi.push( this.syncData )
  };

  handleClickRandomReviewMode = () => {
    this.reviewRandom()
    this.INCREMENT_REVIEWD_COUNT()
  };

  render() {
    return (
      <StyledRoot>
        <button onClick={() => this.TOOGLE_TREE_PANEL()}>Tree Panel</button>
        {!this.isStandardReviewMode && (
          <>
            <button onClick={this.handleClickRandomReviewMode}>
              Random Review{" "}
              {this.reviewdCount >= 2 && (
                <span>(reviewd: {this.reviewdCount - 1})</span>
              )}
            </button>
            <button onClick={ () => this.startStandardReview() }>Start Standard Review</button>
          </>
        )}
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
        <button onClick={() => this.saveSearchingWordToCurrentSelectedTree()}>
          Save Word to Selected Folder
        </button>
        <button>Setting</button>
        <button onClick={() => this.export()}>Export</button>
        <button>Import</button>
        <button>Update Media</button>
        <button onClick={this.handleClickPull}>Pull</button>
        <button onClick={this.handleClickPush}>Push</button>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  font-size: 14px;
`
