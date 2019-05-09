import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeWord, TypeWordDegree, TypeWordNote } from '@/__typings__/word'
import Degree from '@/componentsPure/Degree/Degree'
import IframeViewer from '@/componentsPure/IframeViewer'
import Note from '@/componentsPure/Note/Note'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {}

@Actions(
  "app",
  "addWordBySearchingWordName",
  "updateSearchingWordNote",
  "deleteSearchingWord",
  "updateSearchingWordDegree"
)
@Selectors( "app", "searchingWord" )
@States( "app", "searchingWordName", "visibleIframe" )
export default class WordPanel extends Component<Props> {
  visibleIframe?: boolean;
  searchingWordName?: string;
  searchingWord?: TypeWord;
  words?: TypeWord[];
  addWordBySearchingWordName?: Function;
  updateSearchingWordNote?: Function;
  deleteSearchingWord?: Function;
  updateSearchingWordDegree?: Function;

  handleAddClick = () => {
    this.addWordBySearchingWordName()
  };

  handleDeleteClick = () => {
    const confirmd = window.confirm( `Are you sure to delete the word "${ this.searchingWordName }"?` )
    confirmd && this.deleteSearchingWord()
  };

  handleNoteChange = ( newNote: TypeWordNote ) => {
    this.updateSearchingWordNote( newNote )
  };

  handleDegreeChange = ( newDegree: TypeWordDegree ) => {
    this.updateSearchingWordDegree( newDegree )
  };

  render() {
    const { searchingWord, searchingWordName } = this
    // searchingWord && console.log( 'searchingWord.degree', searchingWord.degree )
    // console.log( this.words )
    return (
      <StyledRoot>
        {searchingWordName.trim() !== "" && searchingWord == null && (
          <button onClick={this.handleAddClick}>Add</button>
        )}
        {searchingWord != null && (
          <>
            <Degree
              degree={searchingWord.degree}
              onChange={this.handleDegreeChange}
            />
            <Note data={searchingWord.note} onChange={this.handleNoteChange} />
            <button onClick={this.handleDeleteClick}>Delete</button>
          </>
        )}
        {this.visibleIframe && (
          <div className="iframeViewerWrapper">
            <IframeViewer
              // src={`https://bing.com/images/search?q=${this.searchingWordName}`}
              src={`https://dictionary.cambridge.org/dictionary/english/${this.searchingWordName}`}
            />
          </div>
        )}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;

  > .iframeViewerWrapper {
    width: 100%;
    height: 500px;
  }
`
