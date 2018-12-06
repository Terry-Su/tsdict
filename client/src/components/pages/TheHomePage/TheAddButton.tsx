import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Button from "@material-ui/core/Button"
import { createWord } from "../../../models/core"
import getUniqueId from "../../../utils/getUniqueId"
import selector from "../../../selectors"

export default mapStateAndStyle()(
  class TheAddButton extends Component<any, any> {

    onButtonClick = () => {
      const { app, core, dispatch } = this.props
      const { searching: name } = app
      const { wordCanBeAdded } = selector
      wordCanBeAdded && dispatch( { type: 'core/ADD_WORD', value: createWord( name ) } )
    }

    render() {
      return selector.wordCanBeAdded && <Button variant="contained" onClick={ this.onButtonClick }>Add</Button>
    }
  }
)
