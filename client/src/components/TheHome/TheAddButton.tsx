import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import Button from "@material-ui/core/Button"
import { createWord } from "../../models/mainData"
import getUniqueId from "../../utils/getUniqueId"
import { getCanBeAdded } from "../../selectors"

export default mapStateAndStyle()(
  class TheAddButton extends Component<any, any> {

    get canBeAdded(): Boolean {
      return getCanBeAdded()
    }

    onButtonClick = () => {
      const { app, mainData, dispatch } = this.props
      const { searching: name } = app
      const { canBeAdded } = this
      canBeAdded && dispatch( { type : 'mainData/ADD_WORD', value: createWord( {
        id: getUniqueId(),
        name
      } ) } )
    }

    render() {
      const { app } = this.props
      const { searching } = app
      const { canBeAdded } = this
      return canBeAdded && <Button variant="contained" onClick={ this.onButtonClick }>Add</Button>
    }
  }
)
