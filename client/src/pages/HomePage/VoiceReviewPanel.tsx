import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'
import NoteReadonly from '@/components/Note/NoteReadonly'
import { TypeWord } from '@/__typings__/word'
import get from 'lodash/get'
import { LongPress } from '@/componentsPure/highOrder/withLongPress'

interface Props {

}
@States('voiceReview', 'voiceReviewingWord')
@Actions('voiceReview', 'reviewNextWord', 'knowCurrentWord', 'speakCurrentWordName')
@Actions('review', 'exitReview')
@Actions('audio', 'play', 'stop')
export default class VoiceReviewPanel extends Component<Props> {
  voiceReviewingWord: TypeWord
  reviewNextWord: Function
  knowCurrentWord: Function
  speakCurrentWordName: Function
  exitReview: Function
  play: Function
  stop: Function

  state = {
    isDisplayingExplanation: false
  }

  isLongPressingNo = false
  noteReadOnlyRef: any = React.createRef()

  get noteText () {
    return this.noteReadOnlyRef.current.editor.innerText
  }

  componentDidMount () {
    this.reviewNextWord()
  }

  speakCurrentWordExplanation () {
    this.stop()
    setTimeout(() => {
      this.play(this.noteText)
    }, 0)
    this.setState({ isDisplayingExplanation: true })
  }

  handleClickYes = () => {
    this.knowCurrentWord()
  }

  handleClickNo = () => {
    if (this.isLongPressingNo) {
      this.isLongPressingNo = false
      return
    }
    this.speakCurrentWordExplanation()
  }

  handleLongPressNo = (e:Event) => {
    this.isLongPressingNo = true
    console.log('long press')
  }

  handleClickContinue = () => {
    this.speakCurrentWordName()
    this.setState({ isDisplayingExplanation: false })
  }

  handleClickBack = () => {
    this.exitReview()
  }

  handleClickHeader =() => {
    if (!this.state.isDisplayingExplanation) {
      this.speakCurrentWordName()
    } else {
      this.speakCurrentWordExplanation()
    }
  }

  render () {
    const { isDisplayingExplanation } = this.state
    return (
      <StyledRoot isDisplayingExplanation={isDisplayingExplanation}>
        <header onClick={this.handleClickHeader}>
          <div className="title">
            <button className="back-button" onClick={this.handleClickBack}>Back</button>
            <span className="text" >
              {get(this.voiceReviewingWord, 'name')}
            </span>
          </div>
          <StyledDiv className="explanation" hidden={!isDisplayingExplanation}>
            {/* Word Explanation... */}
            <NoteReadonly ref={this.noteReadOnlyRef} data={get(this.voiceReviewingWord, 'note')} />
          </StyledDiv>
        </header>
        <main>
          {!isDisplayingExplanation && <>
            <div className="button-container">
              <button className="left" onClick={this.handleClickYes}>Yes</button>
            </div>
            <LongPress className="button-container" onLongPress={this.handleLongPressNo}>
              <button className="right" onClick={this.handleClickNo}>No</button>
            </LongPress>
          </>}
          {isDisplayingExplanation && <div className="button-container"><button className="continue" onClick={this.handleClickContinue}>Continue</button></div>}
        </main>
      </StyledRoot>
    )
  }
}

const StyledRoot:any = styled.div`
width: 100%;
height: 100%;
>header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%; 
  >.title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 80px;
    ${(props: any) => !props.isDisplayingExplanation ? 'height: 100%;' : ''}
    >.back-button {
      position: absolute;
      left: 5px;
      top: 5px;
      margin-right: auto;
    }
  }
  >.explanation {
    flex: 1;
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc( 100% - 80px );
    overflow: auto;
  }
}
>main {
  display: flex;
  height: 50%;
  >.button-container {
    display: flex;
    flex: 1;
    height: 100%;
    margin: 0;
    padding: 0;
    >button {
      flex: 1;
    }
  }
}
`
const StyledDiv:any = styled.div``
