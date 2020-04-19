import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeTag } from '@/__typings__'
import { ReviewLevel } from '@/__typings__/review'
import { TypeWord, TypeWordNote } from '@/__typings__/word'
import Iframes from '@/components/Iframes'
import Note from '@/components/Note/Note'
import Degree from '@/componentsPure/Degree/Degree'
import IframeViewer from '@/componentsPure/IframeViewer'
import InputSuggested from '@/componentsPure/InputSuggested/InputSuggested'
import { Actions, Selectors, States } from '@/utils/decorators'
import { CalcTree } from '@/utils/getters/tree'
import { debounce } from '@/utils/lodash'

import WordPanelInputSuggested from './WordPanelInputSuggested'
import Pronunciation from '@/components/Pronunciation'

interface Props {}

@Actions(
  "app",
  "addWordBySearchingWordName",
  "updateSearchingWordNote",
  "deleteSearchingWord",
  "updateSearchingWordReviewLevel",
  "refreshSearchingWordNextReviewTime",
  "saveSearchingWordToCurrentSelectedTree",
)
@Actions( 'tree', 'selectTag' )
@Selectors( "app", "searchingWord", "searchWordTags" )
@States( "app", "searchingWordName", "visibleIframe" )
@States( "word", "visibleWordPanel" )
@Selectors( "tree", "rootCalcTree" )
export default class WordPanel extends Component<Props> {
  state = {
    visibleInputSuggested: false,
  }

  searchWordTags?: TypeTag[];
  visibleIframe?: boolean;
  visibleWordPanel?: boolean;
  searchingWordName?: string;
  searchingWord?: TypeWord;
  selectTag?: Function;
  rootCalcTree?: CalcTree;
  addWordBySearchingWordName?: Function;
  updateSearchingWordNote?: Function;
  deleteSearchingWord?: Function;
  updateSearchingWordReviewLevel?: Function;
  saveSearchingWordToCurrentSelectedTree?: Function;
  refreshSearchingWordNextReviewTime?: Function;

  handleAddClick = () => {
    this.addWordBySearchingWordName()
  };

  handleDeleteClick = () => {
    const confirmd = window.confirm(
      `Are you sure to delete the word "${this.searchingWordName}"?`
    )
    confirmd && this.deleteSearchingWord()
  };

  handleNoteChange = debounce( ( newNote: TypeWordNote ) => {
    this.updateSearchingWordNote( newNote )
  }, 600 )

  handleDegreeChange = ( newDegree: ReviewLevel ) => {
    this.updateSearchingWordReviewLevel( newDegree )
    this.refreshSearchingWordNextReviewTime()
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

  handleClickShowTrees = () => {
    const trees = this.rootCalcTree.queryTreesByWordId( this.searchingWord.id )
    alert( trees.map( tree => tree.pathName ).join( '\n\n' ) )
  }

  render() {
    const { searchingWord, searchingWordName } = this
    const { visibleInputSuggested } = this.state
    return (
      this.visibleWordPanel &&  <StyledRoot>
        {searchingWordName.trim() !== "" && searchingWord == null && (
          <>
          <button onClick={this.handleAddClick}>Add</button>
          <button onClick={() => this.saveSearchingWordToCurrentSelectedTree()}>
          Add to Selected Folder
        </button>
          </>
        )}
        {searchingWord != null && (
          <div className="main">
            <div className="topbar">
              <Pronunciation />
              &nbsp;
              <Degree
                degree={searchingWord.reviewLevel}
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
            <div className="bottom">
              <Note data={searchingWord.note} onChange={this.handleNoteChange} />
              <button onClick={() => this.saveSearchingWordToCurrentSelectedTree()}>
                Add to Selected Folder
              </button>
              <button>Reset Review(Current Review Level: { searchingWord.reviewLevel })</button>
              <button onClick={ this.handleClickShowTrees }>Show Trees</button>
              <button onClick={this.handleDeleteClick}>Delete</button>
            </div>
          </div>
        )}
        {this.visibleIframe && (
          <div className="iframeViewerWrapper">
            <Iframes />
          </div>
        )}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;

  >.main {
    display: flex;
    flex-direction: column;
    @media (max-width: 576px) { 
      /* flex-direction: column-reverse; */
    }
    > .topbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      >.tagsWrapper {
        margin: 0 0 0 10px;
      }
    }
    >.bottom {
      flex: 1;
      overflow: auto;
    }
  }

  
  

  > .iframeViewerWrapper {
    width: 100%;
    height: 500px;
  }
`
