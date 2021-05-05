import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeIframeLink } from '@/__typings__/iframe'
import IframeViewer from '@/componentsPure/IframeViewer'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

interface State {
  activeIframeLink: TypeIframeLink 
}

@States( 'iframe', 'iframeLinks' )
@States( "app", "searchingWordName" )
export default class Iframes extends Component<Props, State> {
  iframeLinks?: TypeIframeLink[]
  searchingWordName?: string

  state: State = {
    activeIframeLink: null,
  }

  get iframeSrc(): string {
    const { activeIframeLink } = this.state
    if ( activeIframeLink != null ) {
      const {  url, prefix = '', postfix = '' } = activeIframeLink
      // console.log( `${prefix}${url}${this.searchingWordName}${postfix}` )
      return `${prefix}${url}${this.searchingWordName}${postfix}`
    }
    return null
  }

  componentDidMount() {
    const firstIframeLink = this.iframeLinks[ 0 ]
    firstIframeLink != null && this.setState( { activeIframeLink: firstIframeLink } )
  }

  switchIframeLink = ( iframeLink: TypeIframeLink ) => {
    this.setState( { activeIframeLink: iframeLink } )
  }

  

  render() {
    return (
      <StyledRoot>
        <div className="buttonsWrapper">
          {
            this.iframeLinks.map( ( iframeLink, index ) => <button onClick={ () => this.switchIframeLink( iframeLink ) } key={ index }>{ iframeLink.label }</button> )
          }
        </div>
        {
          this.iframeSrc != null && <IframeViewer src={ this.iframeSrc } />
        }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  >.buttonsWrapper {
    position: absolute;
    z-index: 1;
    top: 50px;
    right: 10px;
    display: flex;
    flex-direction: column;

    >button {
      margin: 5px 0;
    }
  }
`