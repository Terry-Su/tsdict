import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import styled from 'styled-components'

import { TypeIframeLink } from '@/__typings__/iframe'
import Dialog from '@/componentsPure/Dialog'
import { Actions, Selectors, States } from '@/utils/decorators'
import { cloneDeep } from '@/utils/lodash'

interface Props {
  
}

// # e.g. [ 0, 1 ]
type TypeOrder = number[]

@States( 'iframe', 'visibleDialogIframeSetting', 'iframeLinks' )
@Actions( 'iframe', 
'HIDE_DIALOG_IFRAME_SETTING', 
'ADD_IFRAME_LINK', 
'DELETE_IFRAME_LINK', 
'SET_IFRAME_LINK_LABEL',
'SET_IFRAME_LINK_URL',
'SET_IFRAME_LINK_PREFIX',
'SET_IFRAME_LINK_POSTFIX',
'RESET_IFRAME_LINKS',
'SET_IFRAME_LINKS',
)
export default class DialogIframeSetting extends Component<Props> {
  visibleDialogIframeSetting: boolean
  iframeLinks: TypeIframeLink[]
  HIDE_DIALOG_IFRAME_SETTING: Function
  ADD_IFRAME_LINK: Function
  DELETE_IFRAME_LINK: Function
  SET_IFRAME_LINK_LABEL: Function
  SET_IFRAME_LINK_URL: Function
  SET_IFRAME_LINK_PREFIX: Function
  SET_IFRAME_LINK_POSTFIX: Function
  RESET_IFRAME_LINKS: Function
  SET_IFRAME_LINKS: Function

  state = {
    newLabel  : '',
    newUrl    : '',
    newPrefix : '',
    newPostfix: '',
    order     : [],
  }

  get realtimeOrder(): TypeOrder {
    return Array.from( new Array( this.iframeLinks.length ) ).map( ( v, index ) => index )
  }

  handleClickAdd = () => {
    const { newLabel: label, newUrl: url, newPrefix: prefix, newPostfix: postfix } = this.state
    if ( label.trim() === '' ) {
      alert( 'Label cannot be empty!' )
    } else if ( url.trim() === '' ) {
      alert( 'Url cannot be empty!' )
    }

    label.trim() !== '' && url.trim() !== '' && this.ADD_IFRAME_LINK( { label, url, prefix, postfix } )
  }

  handleClickDelete = ( link: TypeIframeLink ) => {
    const confirmd = window.confirm(
      `Are you sure to delete "label: ${link.label}, url: ${link.url}"?`
    ) 
    confirmd && this.DELETE_IFRAME_LINK( link )
  }

  handleClickReset = () => {
    const confirmd = window.confirm(
      `Are you sure to reset to default"?`
    ) 
    confirmd && this.RESET_IFRAME_LINKS()
  }

  handleChangeSort = ( order, sortable, evt ) => {
    const { iframeLinks } = this
    let newIframeLinks = []
    order.forEach( ( orderIndex, index ) => {
      newIframeLinks[ index ] = iframeLinks[ orderIndex ]
    } )
    this.SET_IFRAME_LINKS( newIframeLinks ) 
  }

  render() {
    
    return (
      <Dialog visible={ this.visibleDialogIframeSetting } onClose={ () => this.HIDE_DIALOG_IFRAME_SETTING() }>
        <StyledRoot>
          <div>
              <input placeholder="Label" onChange={ e => this.setState( { newLabel: e.target.value } ) } />
              <input placeholder="Url" onChange={ e => this.setState( { newUrl: e.target.value } ) } />
              <input placeholder="(Prefix)" onChange={ e => this.setState( { newPrefix: e.target.value } ) } />
              <input placeholder="(Postfix)" onChange={ e => this.setState( { newPostfix: e.target.value } ) } />
          </div>
          <div><button onClick={ this.handleClickAdd }>Add</button></div>
          <br />
          <Sortable onChange={ this.handleChangeSort }>
            {
              // # 'data-id' is used for sorting
              this.iframeLinks.map( ( link, index ) => <div className="linkItem" key={index} data-id={ index }>
                <input placeholder="Label" value={ link.label } onChange={ e => this.SET_IFRAME_LINK_LABEL( link, e.target.value ) } />
                <input placeholder="Url" value={ link.url } onChange={ e => this.SET_IFRAME_LINK_URL( link, e.target.value ) }/>
                <input placeholder="(Prefix)" value={ link.prefix } onChange={ e => this.SET_IFRAME_LINK_PREFIX( link, e.target.value ) }/>
                <input placeholder="(Postfix)" value={ link.postfix } onChange={ e => this.SET_IFRAME_LINK_POSTFIX( link, e.target.value ) }/>
                <button onClick={ () => this.handleClickDelete( link ) }>Delete</button>
              </div> )
            }
          </Sortable>
          <br />
          <div><button onClick={ this.handleClickReset }>Reset to Default</button></div>
        </StyledRoot>
      </Dialog>
    )
  }
}

const StyledRoot = styled.div``