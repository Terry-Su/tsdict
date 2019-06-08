import React, { Component } from 'react'
import styled from 'styled-components'

import { TreeSelection, TypeTreeColumn } from '@/__typings__/tree'
import DialogIframeSetting from '@/components/dialogs/DialogIframeSetting'
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

@States( "tree", "visibleTreePanel" )
@Selectors( "review", "isReviewMode", "isStandardReviewMode" )
@Actions( "tree", "SET_TREE" )
@Actions( "word", "SET_WORDS" )
@Actions( "tag", "SET_TAGS" )
export default class HomePage extends Component<Props> {
  isReviewMode?: boolean;
  visibleTreePanel?: boolean;
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
            <div className="wordPanelWrapper">
              <Pronunciation />
              <WordPanel />
            </div>
          )}
        </div>

        {/* # dialogs */}
        <DialogIframeSetting />
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
    height: 60px;
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

    > .treePanelWrapper {
      box-sizing: border-box;
      display: flex;
      width: 50%;
      border: 1px solid #ddd;
    }

    > .wordPanelWrapper {
      box-sizing: border-box;
      /* display: flex; */
      ${( props: any ) => props.visibleTreePanel ? `width: 50%;` : `width: 100%`}
      border: 1px solid #ddd;
    }

    > .standardReviewPanelWrapper {
      box-sizing: border-box;
      /* display: flex; */
      ${( props: any ) => props.visibleTreePanel ? `width: 50%;` : `width: 100%`}
      border: 1px solid #ddd;
    }
  }
`
