import React, { Component } from 'react'
import styled from 'styled-components'

import IframeViewer from '@/components/IframeViewer'
import Note from '@/components/Note/Note'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}
@States( 'app', 'searchingWordName' )
export default class WordPanel extends Component<Props> {
  searchingWordName?: string

  render() {
    return (
      <StyledRoot>
        { this.searchingWordName }
        <Note />
        {/* <div className="iframeViewerWrapper"><IframeViewer src={`https://bing.com/images/search?q=${ this.searchingWordName }`}/></div> */}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  
  >.iframeViewerWrapper {
    width: 100%;
    height: 500px;
  }
`