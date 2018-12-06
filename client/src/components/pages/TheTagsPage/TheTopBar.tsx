import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace"
import selector from "../../../selectors"
import { notNil } from "../../../utils/lodash"

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
  class TheTopBar extends Component<any, any> {

    onBackClick = () => {
      this.props.dispatch( { type: 'app/UPDATE_CURRENT_TAG_ID', value: null } )
    }

    render() {
      const { classes: c } = this.props
      const { isTagsHome, currentTag } = selector
      return (
        <div className={c.entry}>
          <div className={c.left}>
            {! isTagsHome && (
              <KeyboardBackspace onClick={this.onBackClick} />
            )}
          </div>
          <h2 className={c.center}>{
            isTagsHome ? 'Tags' : currentTag.name
          }</h2>
          <span className={c.right}>Other</span>
        </div>
      )
    }
  }
)
