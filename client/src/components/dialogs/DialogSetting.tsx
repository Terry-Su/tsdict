import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import styled from 'styled-components'

import { TypeIframeLink } from '@/__typings__/iframe'
import Dialog from '@/componentsPure/Dialog'
import { Actions, Selectors, States } from '@/utils/decorators'
import { cloneDeep } from '@/utils/lodash'

@States( 'setting', 'visibleDialogSetting', 'origin' )
@Actions( 'setting', 'HIDE_DIALOG_SETTING', 'SET_ORIGIN' )
export default class DialogSetting extends Component {
  visibleDialogSetting?: boolean
  origin?: string
  HIDE_DIALOG_SETTING?: Function
  SET_ORIGIN?: Function

  render() {
    
    return (
      <Dialog visible={ this.visibleDialogSetting } onClose={ () => this.HIDE_DIALOG_SETTING() }>
        <StyledRoot>
          <div>
           Database Origin:  <input value={this.origin} onBlur={ e => this.SET_ORIGIN( e.target.value ) }/>
          </div>
        </StyledRoot>
      </Dialog>
    )
  }
}

const StyledRoot = styled.div``