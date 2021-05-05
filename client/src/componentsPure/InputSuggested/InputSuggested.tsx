import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

export type SuggestItem = string;

interface Props {
  value: string;
  suggestItems: SuggestItem[];
  onInputChange?: ( value: string ) => void;
  onConfirm?: ( text: string ) => void;
}

class State {
  visibleSuggestPanel: boolean = false;
}

export default class InputSuggested extends Component<Props> {
  state: State = new State();
  inputRef: any = React.createRef()

  componentDidMount() {
    this.inputRef.current.focus()
  }

  updateIfShowSuggestPanel = value => {
    if (
      value.trim() === "" ||
      this.props.suggestItems.some( item => item.startsWith( value ) )
    ) {
      this.setState( { visibleSuggestPanel: true } )
    } else {
      this.setState( { visibleSuggestPanel: false } )
    }
  };

  handleChangeInput = e => {
    const { onInputChange } = this.props
    const value = e.target.value
    onInputChange && onInputChange( value )
    this.updateIfShowSuggestPanel( value )
  };

  handleFocusInput = () => {
    this.updateIfShowSuggestPanel( this.props.value )
  };

  handleBlurInput = () => {
    this.setState( { visibleSuggestPanel: false } )
    const { onConfirm } = this.props
    onConfirm && onConfirm( this.props.value.trim() )
  };

  handleSuggestItemClick = ( suggestItem : SuggestItem ) => {
    const { onInputChange } = this.props
    onInputChange && onInputChange( suggestItem )
  }

  render() {
    const { value = "", suggestItems = [] } = this.props
    return (
      <StyledRoot>
        <input
          value={this.props.value}
          onChange={this.handleChangeInput}
          onFocus={this.handleFocusInput}
          onBlur={this.handleBlurInput}
          ref={this.inputRef}
        />
        {this.state.visibleSuggestPanel && (
          <div className="suggestPanel">
            {suggestItems.map( ( suggestItem, index ) => (
              <div className="suggestItem" key={index} onMouseDown={ () => this.handleSuggestItemClick( suggestItem ) }>
                {suggestItem}
              </div>
            ) )}
          </div>
        )}
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  > input {
    height: 20px;
  }
  > .suggestPanel {
    position: absolute;
    top: 26px;
    width: 100%;
    max-height: 100px;
    border: 1px solid #ddd;
    background: white;

    > .suggestItem {
      padding: 5px 0;
      border: 1px solid #ddd;
    }
  }
`
