import React, { Component } from 'react'
import styled from 'styled-components'

import { TreeSelection, TypeTreeColumn } from '@/__typings__/tree'
import Pronunciation from '@/components/Pronunciation'
import TreePanel from '@/components/TreePanel/TreePanel'
import { reduxStore } from '@/entry'
import appApi from '@/services/modules/appApi'
import { Actions, Selectors, States } from '@/utils/decorators'

import SearchBox from './HomePage/SearchBox'
import StandardReviewPanel from './HomePage/StandardReviewPanel'
import Toolbar from './HomePage/Toolbar'
import WordPanel from './HomePage/WordPanel/WordPanel'
import FolderPanel from '@/components/FolderPanel'
import VoiceReviewPanel from './HomePage/VoiceReviewPanel'

interface Props {}

@States( "word", "visibleWordPanel" )
@States( "tree", "visibleTreePanel" )
@Selectors( "review", "isReviewMode", "isStandardReviewMode", "isVoiceReviewMode" )
@Actions( "tree", "SET_TREE" )
@Actions( "word", "SET_WORDS" )
@Actions( "tag", "SET_TAGS" )
@Actions( "review", "exitReview" )
export default class HomePage extends Component<Props> {
  isReviewMode?: boolean;
  visibleTreePanel?: boolean;
  visibleWordPanel?: boolean;
  isStandardReviewMode?: boolean;
  isVoiceReviewMode?: boolean;
  SET_TREE?: Function;
  SET_WORDS?: Function;
  SET_TAGS?: Function;
  exitReview?: Function;

  state = {
    mobileVisibleToolbar: false
  }

  render() {
    const { mobileVisibleToolbar } = this.state
    return (
      <StyledRoot visibleTreePanel={this.visibleTreePanel}>
        {!this.isReviewMode &&
          <>
          <div className={ `toolbarWrapper ${mobileVisibleToolbar ? `` : `m-hide`}` }>
            <div className="only-m-show exit-toolbar-wrapper">
              <button onClick={() => this.setState( { mobileVisibleToolbar: false } )}>Back</button>
            </div>
            <Toolbar />
          </div>
          {
            !mobileVisibleToolbar &&
            <div className="only-m-show show-toolbar-button-wrapper">
                <button onClick={ () => this.setState({ mobileVisibleToolbar: true }) }>Toolbar</button>
            </div>
          }
          </>
        }
        {!this.isReviewMode &&
          <div className="searchBoxWrapper">
            <SearchBox />
          </div>
        }
        <div className="bottomContainer">
          {this.visibleTreePanel && (
            <div className="treePanelWrapper">
              <TreePanel />
              {/* <FolderPanel /> */}
            </div>
          )}
          {this.isStandardReviewMode ? (
            <div className="standardReviewPanelWrapper">
              <StandardReviewPanel />
            </div>
          ) : (
            this.visibleWordPanel && (
              <div className="wordPanelWrapper">
                <WordPanel />
              </div>
            )
          )}
          {
            this.isVoiceReviewMode &&
            <div className="voiceReviewPanelWrapper">
              <VoiceReviewPanel />
            </div>
          }
        </div>

        
      </StyledRoot>
    )
  }
}

const StyledRoot: any = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 576px) {
    .show-toolbar-button-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 30px;
      >button {
        /* width: 100%; */
        /* height: 100%; */
      }
    }
  }

  > .toolbarWrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-height: 60px;
    border: 1px solid #ddd;
    @media (max-width: 576px) { 
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: #fff;
      .exit-toolbar-wrapper {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }

  > .searchBoxWrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    border: 1px solid #ddd;
  }

  > .bottomContainer {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    /* height: calc(100% - 120px); */
    display: flex;
    justify-content: space-between;
    @media (max-width: 576px) {
      flex-direction: column;
      height: calc(100% - 30px - 60px);
    }
    > .treePanelWrapper {
      box-sizing: border-box;
      display: flex;
      /* width: 50%; */
      /* height: 50; */
      flex: 1;
      border: 1px solid #ddd;
      overflow: auto;
    }

    > .wordPanelWrapper {
      flex: 1;
      box-sizing: border-box;
      /* display: flex; */
      border: 1px solid #ddd;
      overflow: auto;
      
    }

    > .standardReviewPanelWrapper {
      box-sizing: border-box;
      height: 100%;
      /* display: flex; */
      border: 1px solid #ddd;
      /* @media (max-width: 576px) {
        height: 100%;
      } */
    }
    >.voiceReviewPanelWrapper {
      width: 100%;
      height: 100%;
    }
  }
`
