import React, { Component } from 'react'

import SubTopBar from '@/components/SubTopBar'
import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'

export default mapStateAndStyle()(
  class TheTreeTopBar extends Component<any, any> {
    get shallShowBackButton(): boolean {
      return notNil( selector.currentTreeIdAbove )
    }

    onBackClick = () => {
      this.props.dispatch( { type: 'treePage/UPDATE_CURRENT_ID_TO_UPPER_ID' } )
    }

    render() {
      const { classes: c } = this.props
      const { shallShowBackButton } = this
      const { currentTree } =  selector
      const { name } = currentTree
      return (
        <SubTopBar 
          left={
            shallShowBackButton && (
              <KeyboardBackspace onClick={this.onBackClick} />
            )
          }
          center={
            <h2>{
              shallShowBackButton ? name  : 'Tree'
            }</h2>
          }
          right={
            <span className={c.right}>Other</span>
          }
        />
      )
    }
  }
)
