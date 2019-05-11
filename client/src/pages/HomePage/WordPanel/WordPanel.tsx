import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTag } from '@/__typings__'
import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'
import Note from '@/components/Note/Note'
import Degree from '@/componentsPure/Degree/Degree'
import IframeViewer from '@/componentsPure/IframeViewer'
import InputSuggested from '@/componentsPure/InputSuggested/InputSuggested'
import { Actions, Selectors, States } from '@/utils/decorators'

import WordPanelInputSuggested from './WordPanelInputSuggested'

interface Props {}

@Actions(
  "app",
  "addWordBySearchingWordName",
  "updateSearchingWordNote",
  "deleteSearchingWord",
  "updateSearchingWordDegree"
)
@Actions( 'tree', 'selectTag' )
@Selectors( "app", "searchingWord", "searchWordTags" )
@States( "app", "searchingWordName", "visibleIframe" )
export default class WordPanel extends Component<Props> {
  state = {
    visibleInputSuggested: false,
  }

  searchWordTags?: TypeTag[];
  visibleIframe?: boolean;
  searchingWordName?: string;
  searchingWord?: TypeWord;
  words?: TypeWord[];
  selectTag?: Function;
  addWordBySearchingWordName?: Function;
  updateSearchingWordNote?: Function;
  deleteSearchingWord?: Function;
  updateSearchingWordDegree?: Function;

  handleAddClick = () => {
    this.addWordBySearchingWordName()
  };

  handleDeleteClick = () => {
    const confirmd = window.confirm(
      `Are you sure to delete the word "${this.searchingWordName}"?`
    )
    confirmd && this.deleteSearchingWord()
  };

  handleNoteChange = ( newNote: TypeWordNote ) => {
    this.updateSearchingWordNote( newNote )
  };

  handleDegreeChange = ( newDegree: TypeWordDegree ) => {
    this.updateSearchingWordDegree( newDegree )
  };

  handleClickTag = ( tag: TypeTag ) => {
    this.selectTag( tag )
  }

  handleClickAddTagBtn = () => {
    this.setState( { visibleInputSuggested: true } )
  }

  handleConfirmInputSuggested = () => {
    this.setState( { visibleInputSuggested: false } )
  }

  render() {
    const { searchingWord, searchingWordName } = this
    const { visibleInputSuggested } = this.state
    return (
      <StyledRoot>
        {searchingWordName.trim() !== "" && searchingWord == null && (
          <button onClick={this.handleAddClick}>Add</button>
        )}
        {searchingWord != null && (
          <>
            <div className="topbar">
              <Degree
                degree={searchingWord.degree}
                onChange={this.handleDegreeChange}
              />
              <span className="tagsWrapper">
              {
                this.searchWordTags.map( ( tag, index ) => <button onClick={() => this.handleClickTag( tag )} key={index}>{ tag.name }</button> )
              }
              {
                visibleInputSuggested && <WordPanelInputSuggested onConfirm={ this.handleConfirmInputSuggested }/>
              }
              <button onClick={ this.handleClickAddTagBtn }>+Tag</button>
              </span>
            </div>
            <Note data={searchingWord.note} onChange={this.handleNoteChange} />
            <button onClick={this.handleDeleteClick}>Delete</button>
          </>
        )}
        {this.visibleIframe && (
          <div className="iframeViewerWrapper">
            <IframeViewer
              // src={`https://bing.com/images/search?q=${this.searchingWordName}`}
              src={`https://dictionary.cambridge.org/dictionary/english/${
                this.searchingWordName
              }`}
            />
          </div>
        )}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;

  > .topbar {
    display: flex;
    align-items: center;

    >.tagsWrapper {
      margin: 0 0 0 10px;
    }
  }

  > .iframeViewerWrapper {
    width: 100%;
    height: 500px;
  }
`
