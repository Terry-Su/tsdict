import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import styled from 'styled-components'

import { TypeIframeLink } from '@/__typings__/iframe'
import Dialog from '@/componentsPure/Dialog'
import { Actions, Selectors, States } from '@/utils/decorators'
import { cloneDeep } from '@/utils/lodash'

@States(
  "dialog",
  "visibleDialogConfirm",
  "dialogConfirmValue",
  "dialogConfirmDesc"
)
@Actions( "dialog", "HIDE_DIALOG_CONFIRM", "SET_DIALOG_CONFIRM_VALUE" )
export default class DialogConfirm extends Component {
  visibleDialogConfirm?: boolean;
  dialogConfirmValue?: string;
  dialogConfirmDesc?: string;
  HIDE_DIALOG_CONFIRM?: Function;
  SET_DIALOG_CONFIRM_VALUE?: Function;

  state = {
    tmpValue: "",
  };

  componentDidMount() {
    console.log( "componentDidMount" )
  }

  handleClickConfirm = () => {
    this.SET_DIALOG_CONFIRM_VALUE( this.state.tmpValue )
    this.HIDE_DIALOG_CONFIRM()
  };

  render() {
    return (
      <Dialog visible={this.visibleDialogConfirm} visibleCloseButton={false}>
        <StyledRoot>
          <p>{this.dialogConfirmDesc}</p>
          <textarea
            value={this.state.tmpValue}
            onChange={e => this.setState( { tmpValue: e.target.value } )}
          />
          <br />
          <div>
            <button onClick={this.handleClickConfirm}>Confirm</button>
            &nbsp;
            <button onClick={() => this.HIDE_DIALOG_CONFIRM()}>Cancel</button>
          </div>
        </StyledRoot>
      </Dialog>
    )
  }
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  textarea {
    width: 80%;
    min-height: 200px;
  }
`
