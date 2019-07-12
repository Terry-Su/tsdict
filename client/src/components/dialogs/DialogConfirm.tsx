import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import styled from 'styled-components'

import { TypeIframeLink } from '@/__typings__/iframe'
import Dialog from '@/componentsPure/Dialog'
import { Actions, Selectors, States } from '@/utils/decorators'
import { cloneDeep } from '@/utils/lodash'

@States( 'dialog', 'visibleDialogConfirm', 'dialogConfirmValue' )
@Actions( 'dialog', 'HIDE_DIALOG_CONFIRM', 'SET_DIALOG_CONFIRM_VALUE' )
export default class DialogConfirm extends Component {
  visibleDialogConfirm?: boolean
  dialogConfirmValue?: string
  HIDE_DIALOG_CONFIRM?: Function
  SET_DIALOG_CONFIRM_VALUE?: Function
  
  state = {
    tmpValue: '',
  }

  handleClickConfirm = () => {
    this.SET_DIALOG_CONFIRM_VALUE( this.state.tmpValue )
    this.HIDE_DIALOG_CONFIRM()
  }

  render() {
    return (
      <Dialog visible={ this.visibleDialogConfirm } visibleCloseButton={ false }>
        <StyledRoot>
          <textarea value={this.state.tmpValue} onChange={ e => this.setState( { tmpValue: e.target.value } ) }></textarea>

          <button onClick={ this.handleClickConfirm }>Confirm</button>
          <button onClick={ () => this.HIDE_DIALOG_CONFIRM() }>Cancel</button>
        </StyledRoot>
      </Dialog>
    )
  }
}

const StyledRoot = styled.div``