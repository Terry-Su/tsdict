import React, { Component } from 'react'

import { TOP_BAR_HEIGHT } from '@/constants/numbers'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

import BasicComponent, { DefaultProps } from '../BasicComponent'
import TheCurrentWordPanel from '../TheCurrentWordPanel/TheCurrentWordPanel'
import TopBar from '../TopBar'

class Props extends DefaultProps {
  isShowingCurrentWordPanel: boolean
  enableCurrentWordPanelClose: boolean
}

export default mapStateAndStyle( {
  main: {
    position : "relative",
    width    : "100%",
    height   : `calc( 100% - ${TOP_BAR_HEIGHT}px )`,
    boxSizing: "border-box",
    padding  : "10px",
    overflow : "auto"
  },
  currentWordPanel: {
    position  : "absolute",
    zIndex    : 100,
    width     : "calc( 100% - 20px )",
    height    : "calc( 100% - 20px )",
    overflow  : "auto",
    background: "white"
  }
} )(
  class TopbarLayout extends BasicComponent<Props> {
    render() {
      const {
        classes: c,
        isShowingCurrentWordPanel: stateIsShowingCurrentWordPanel = false,
        enableCurrentWordPanelClose
      } = this.props
      const { isShowingCurrentWordPanel } = selector.appState
      return (
        <div className={c.w_100__h_100}>
          <TopBar />
          <div className={c.main}>
            {( stateIsShowingCurrentWordPanel || isShowingCurrentWordPanel ) && (
              <div className={c.currentWordPanel}>
                <TheCurrentWordPanel enableClose={enableCurrentWordPanelClose}/>
              </div>
            )}
            {this.props.children}
          </div>
        </div>
      )
    }
  }
)
