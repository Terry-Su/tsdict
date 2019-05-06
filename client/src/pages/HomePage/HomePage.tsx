import React, { Component } from 'react'
import styled from 'styled-components'

import TreePanel from '@/components/TreePanel/TreePanel'
import { Actions, Selectors, States } from '@/utils/decorators'

import SearchBox from './SearchBox'
import Toolbar from './Toolbar'
import WordPanel from './WordPanel'

interface Props {}

export default class HomePage extends Component<Props> {
  render() {
    return (
      <StyledRoot>
        <div className="toolbarWrapper">
          <Toolbar />
        </div>
        <div className="searchBoxWrapper">
          <SearchBox />
        </div>
        <div className="bottomContainer">
          <div className="treePanelWrapper">
            <TreePanel />
          </div>
          <div className="wordPanelWrapper">
            <WordPanel />
          </div>
        </div>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
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
    height: 100%;
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
      display: flex;
      width: 50%;
      border: 1px solid #ddd;
    }
  }
`
