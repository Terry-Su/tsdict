import React, { Component } from 'react'

import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'

export default mapStateAndStyle( {
  entry: {
    display   : "flex",
    alignItems: "center"
  },
  left: {
    flex          : 1,
    display       : "flex",
    justifyContent: "flex-start"
  },
  center: {
    flex          : 1,
    display       : "flex",
    justifyContent: "center"
  },
  right: {
    flex          : 1,
    display       : "flex",
    justifyContent: "flex-end"
  }
} )(
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
        <div className={c.entry}>
          <div className={c.left}>
            {shallShowBackButton && (
              <KeyboardBackspace onClick={this.onBackClick} />
            )}
          </div>
          <h2 className={c.center}>{
            shallShowBackButton ? name  : 'Tree'
          }</h2>
          <span className={c.right}>Other</span>
        </div>
      )
    }
  }
)
