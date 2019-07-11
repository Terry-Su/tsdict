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

interface Props {}

@States( "word", "visibleWordPanel" )
@States( "tree", "visibleTreePanel" )
@Selectors( "review", "isReviewMode", "isStandardReviewMode" )
@Actions( "tree", "SET_TREE" )
@Actions( "word", "SET_WORDS" )
@Actions( "tag", "SET_TAGS" )
export default class HomePage extends Component<Props> {
  isReviewMode?: boolean;
  visibleTreePanel?: boolean;
  visibleWordPanel?: boolean;
  selections?: TreeSelection[];
  columns?: TypeTreeColumn[];
  isStandardReviewMode?: boolean;
  SET_TREE?: Function;
  SET_WORDS?: Function;
  SET_TAGS?: Function;

  render() {
    return (
      <StyledRoot visibleTreePanel={this.visibleTreePanel}>
        <div className="toolbarWrapper">
          <Toolbar />
        </div>
        {/* {! this.isReviewMode && ( */}
        <div className="searchBoxWrapper">
          <SearchBox />
        </div>
        {/* )} */}
        <div className="bottomContainer">
          {this.visibleTreePanel && (
            <div className="treePanelWrapper">
              <TreePanel />
            </div>
          )}
          {this.isStandardReviewMode ? (
            <div className="standardReviewPanelWrapper">
              <Pronunciation />
              <StandardReviewPanel />
            </div>
          ) : (
            this.visibleWordPanel && (
              <div className="wordPanelWrapper">
                <Pronunciation />
                <WordPanel />
              </div>
            )
          )}
        </div>

        
      </StyledRoot>
    )
  }
}

const StyledRoot: any = styled.div`
  width: 100%;
  height: 100%;

  > .toolbarWrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-height: 60px;
    border: 1px solid #ddd;
  }

  > .searchBoxWrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    border: 1px solid #ddd;
  }

  > .bottomContainer {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 120px);
    display: flex;
    justify-content: space-between;

    @media (max-width: 576px) {
      display: block;
    }

    > .treePanelWrapper {
      box-sizing: border-box;
      display: flex;
      /* width: 50%; */
      /* height: 50; */
      flex: 1;
      border: 1px solid #ddd;

      @media (max-width: 576px) {
        min-height: 200px;
        height: 33%;
      }
    }

    > .wordPanelWrapper {
      flex: 1;
      box-sizing: border-box;
      /* display: flex; */
      ${( props: any ) => props.visibleTreePanel ? `width: 50%;` : `width: 100%`}
      border: 1px solid #ddd;
      @media (max-width: 576px) {
       width: 100%;
      }
    }

    > .standardReviewPanelWrapper {
      box-sizing: border-box;
      /* display: flex; */
      ${( props: any ) => props.visibleTreePanel ? `width: 50%;` : `width: 100%`}
      border: 1px solid #ddd;
      @media (max-width: 576px) {
        height: 100%;
      }
    }
  }
`
