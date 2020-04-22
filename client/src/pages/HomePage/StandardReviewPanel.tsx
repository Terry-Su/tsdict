import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeWord } from '@/__typings__/word'
import { Actions, Selectors, States } from '@/utils/decorators'

import WordPanel from './WordPanel/WordPanel'
import Pronunciation from '@/components/Pronunciation'
import SearchBox from './SearchBox'

interface Props { }

@States('review', 'visibleReviewingWordContent')
@Actions('review', 'SHOW_REVIEWING_WORD_CONTENT',
  'standardReviewWordFamiliar',
  'standardReviewWordKnown',
  'standardReviewWordUnfamiliar',
  'exitReview'
)
@Actions('app', 'pronunceSearchingWord')
export default class StandardReviewPanel extends Component<Props> {
  visibleReviewingWordContent?: boolean;
  SHOW_REVIEWING_WORD_CONTENT?: Function;
  standardReviewWordFamiliar?: Function;
  standardReviewWordKnown?: Function;
  standardReviewWordUnfamiliar?: Function;
  pronunceSearchingWord?: Function;
  exitReview?: Function;

  componentDidMount () {

  }

  handleReviewButtonSectionKeyPress = ({ charCode, altKey }) => {
    console.log({ charCode })
    // if ( altKey ) {
    if (charCode === 49) {
      this.SHOW_REVIEWING_WORD_CONTENT()
    } else if (charCode === 50) {
      this.standardReviewWordFamiliar()
    } else if (charCode === 51) {
      this.standardReviewWordKnown()
    } else if (charCode === 52) {
      this.standardReviewWordUnfamiliar()
    } else if (charCode === 53) {
      this.pronunceSearchingWord()
    }
    // }
  }

  render () {
    return (
      <StyledRoot>
        <header>
          <button onClick={() => this.exitReview()}>Back</button>
          <Pronunciation />
          <SearchBox />
        </header>
        <div onKeyPress={this.handleReviewButtonSectionKeyPress} className="featurePanel" tabIndex={0}>
          <button onClick={() => this.standardReviewWordFamiliar()}>
            Familiar
          </button>
          <button onClick={() => this.standardReviewWordKnown()}>Known</button>
          <button onClick={() => this.standardReviewWordUnfamiliar()}>
            Unfamiliar
          </button>
        </div>
        <div className="bottom">
          {this.visibleReviewingWordContent ? (
            <WordPanel />
          ) : (
            <div
              className="showRegion"
              onClick={() => this.SHOW_REVIEWING_WORD_CONTENT()}
            >
                Show
            </div>
          )}
        </div>

      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  >header {
    display: flex;
    align-items: center;
    height: 60px;
  }

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
  >.bottom {
    flex: 1;
    .showRegion {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  }
  
`
