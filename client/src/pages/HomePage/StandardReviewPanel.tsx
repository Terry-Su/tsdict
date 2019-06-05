import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeWord } from '@/__typings__/word'
import { Actions, Selectors, States } from '@/utils/decorators'

import WordPanel from './WordPanel/WordPanel'

interface Props {}

@States( "review", "visibleReviewingWordContent" )
@Actions( "review", "SHOW_REVIEWING_WORD_CONTENT", 
'standardReviewWordFamiliar',
'standardReviewWordKnown',
'standardReviewWordUnfamiliar',
)
export default class StandardReviewPanel extends Component<Props> {
  visibleReviewingWordContent?: boolean;
  SHOW_REVIEWING_WORD_CONTENT?: Function;
  standardReviewWordFamiliar?: Function;
  standardReviewWordKnown?: Function;
  standardReviewWordUnfamiliar?: Function;

  componentDidMount() {
    
  }

  render() {
    return (
      <StyledRoot>
        <div className="featurePanel">
          <button onClick={() => this.standardReviewWordFamiliar()}>
            Familiar
          </button>
          <button onClick={() => this.standardReviewWordKnown()}>Known</button>
          <button onClick={() => this.standardReviewWordUnfamiliar()}>
            Unfamiliar
          </button>
        </div>
        {this.visibleReviewingWordContent ? (
          <>
            <br />
            <WordPanel />
          </>
        ) : (
          <div
            className="showRegion"
            onClick={() => this.SHOW_REVIEWING_WORD_CONTENT()}
          >
            Show
          </div>
        )}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;

  .featurePanel {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    /* flex-wrap: wrap; */

    button {
      margin: 0 10px;
    }
  }

  .showRegion {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`
