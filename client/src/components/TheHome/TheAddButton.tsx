import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import Button from "@material-ui/core/Button"
import { createWord } from "../../models/mainData"
import getUniqueId from "../../utils/getUniqueId"

export default mapStateAndStyle()(
  class TheAddButton extends Component<any, any> {

    get canBeAdded(): Boolean {
      const { app, mainData } = this.props
      const { searching } = app
      const { words } = mainData
      return searching.trim() !== '' && words.every( ( { name } ) => name !== searching )
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
