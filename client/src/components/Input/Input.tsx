import React, { Component } from 'react'
import { isFunction } from 'util'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import LibaryInput from '@material-ui/core/Input'

import ClearInputButton from '../Button/ClearInputButton'

class Props extends DefaultProps {
  containerClassName: string

  enableClear: boolean
  onClearMouseDown: any

  // For Input
  defaultValue: string
  value: string
  type: string
  placeholder: string
  inputRef: any

  autoFocus: boolean

  onChange: any
  onBlur: any
  onFocus: any
  onKeyPress: any
}
class State {
  shallHideClearButton: boolean = false
  value: string = ""
}

const CLEAR_BUTTON_SIZE = 24

class Style extends GlobalStyle {
  entry = {
    position: "relative",
    ...this.d_ib
  }

  input = {}

  inputWithClear = {
    padding: `0 -${CLEAR_BUTTON_SIZE}px 0 0`
  }

  clearButton = {
    position: "absolute",
    right   : 0,
    top     : 0,
    ...this.d_ib
  }
}

export default mapStateAndStyle<Props>( new Style() )(
  class Input extends BasicComponent<Props, State> {
    state = new State()

    inputRef = React.createRef()

    get input(): HTMLInputElement {
      const { props } = this
      const ref = notNil( props.inputRef ) ? props.inputRef : this.inputRef
      return ref.current
    }

    render() {
      const {
        classes: c,
        dispatch,
        containerClassName = "",
        onClearMouseDown,
        enableClear = false
      } = this.props

      const {
        className = "",

        defaultValue,
        value,
        type,
        placeholder,
        inputRef,

        autoFocus,

        onChange,
        onBlur,
        onFocus,
        onKeyPress
      } = this.props

      const { shallHideClearButton } = this.state
      const { state } = this
      const showClearButton =
        enableClear &&
        !shallHideClearButton && (
          notNil( this.input ) ? this.input.value !== '' : false
         )

      return (
        <div className={[ c.entry, containerClassName ].join( " " )}>
          <LibaryInput
            {...{
              className: [
                c.input,
                showClearButton ? c.inputWithClear : "",
                className
              ].join( " " ),
              defaultValue,
              value,
              type,
              placeholder,
              inputRef: notNil( inputRef ) ? inputRef : this.inputRef,
              autoFocus,
              onChange: e => {
                this.setState( { value: e.target.value } )
                onChange && onChange( e )
              },
              onBlur: e => {
                this.setState( { shallHideClearButton: true } )
                onBlur && onBlur( e )
              },
              onFocus: e => {
                this.setState( { shallHideClearButton: false } )
                onBlur && onBlur( e )
              },
              onKeyPress
            }}
          />
          {showClearButton && (
            <div
              className={c.clearButton}
              onMouseDown={() => onClearMouseDown && onClearMouseDown()}
            >
              <ClearInputButton />
            </div>
          )}
        </div>
      )
    }
  }
)
