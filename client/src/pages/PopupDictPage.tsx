import React, { Component } from 'react'
import styled from 'styled-components'

import Pronunciation from '@/components/Pronunciation'
import TreePanel from '@/components/TreePanel/TreePanel'
import { Actions, Selectors, States } from '@/utils/decorators'

import SearchBox from './HomePage/SearchBox'
import Toolbar from './HomePage/Toolbar'
import WordPanel from './HomePage/WordPanel/WordPanel'

interface Props {}

@States( "tree", "visibleTreePanel" )
export default class PopupDictPage extends Component<Props> {
  visibleTreePanel?: boolean;
  render() {
    return (
      <StyledRoot visibleTreePanel={this.visibleTreePanel}>
        <div className="wordPanelWrapper">
          <SearchBox />
          <Pronunciation />
          <WordPanel />
        </div>
        <div className="bottomContainer">
          {
            this.visibleTreePanel && <div className="treePanelWrapper">
            <TreePanel />
          </div>
          }
          <div className="toolbarWrapper">
          <Toolbar />
        </div>
        </div>
      </StyledRoot>
    )
  }
}

const StyledRoot: any = styled.div`
  width: 100%;
  height: 100%;

  > .wordPanelWrapper {
    width: 100%;
    height: 70%;
    overflow: auto;
  }
  > .bottomContainer {
    box-sizing: border-box;
      border: 1px solid #ddd;
    width: 100%;
    height: 30%;

    > .treePanelWrapper {
      box-sizing: border-box;
      border: 1px solid #ddd;
      width: 100%;
      height: calc( 100% - 65px );
    }
    > .toolbarWrapper {
      box-sizing: border-box;
      border: 1px solid #ddd;
      width: 100%;
      height: 65px;
      overflow: auto;
    }
  }
`
