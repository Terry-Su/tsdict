import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'

import ExitButton from './Button/ExitButton'
import FullScreenButton from './Button/FullScreenButton'

export default mapStateAndStyle( {
  entry: {
    position: 'relative',
    width   : '100%',
    height  : '100%',
  },
  iframe: {
    width : '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    right   : '5px',
    top     : '5px',
  },
  fullScreen: {
    position: 'fixed',
    width   : '100%',
    height  : '100%',
    left    : '0',
    top     : '0',
  }
} )(
  class IframeViewer extends Component<any, any> {
    constructor( props ) {
      super( props )

      this.state = {
        isFullScreen: false
      }
    }

    onExitButtonClick = () => {
      this.setState( {
        isFullScreen: false
      } )
    }

    onFullScreenButtonClick = () => {
      this.setState( {
        isFullScreen: true
      } )
    }

    render() {
      const { classes: c, src } = this.props
      const { isFullScreen } = this.state
      return (
        <div className={ `${c.entry} ${ isFullScreen ? c.fullScreen : '' }` }>
          {
            isFullScreen && <span className={c.button}><ExitButton onClick={ this.onExitButtonClick } /> </span>
          }
          {
            !isFullScreen && <span className={c.button}><FullScreenButton onClick={ this.onFullScreenButtonClick }/></span>
          }
          <iframe className={ c.iframe } src={src} frameBorder="0" />
        </div>
      )
    }
  }
)
