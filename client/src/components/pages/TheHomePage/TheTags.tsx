import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import selector from "../../../selectors"

export default mapStateAndStyle()(
  class TheTags extends Component<any, any> {
    state = {
      tagName: ""
    }
    onInputBlur() {
      this.addWordToTagName()
    }
    onEnterPress() {
      this.addWordToTagName()
    }
    addWordToTagName() {
      const { tagName } = this.state
      if ( !( tagName.trim() === "" ) ) {
        const { id: wordID } = selector.currentWord
        this.props.dispatch( {
          type: "mainData/ADD_WORD_ID_TO_TAG_NAME",
          wordID,
          tagName
        } )
      }
    }
    render() {
      const { tagName } = this.state
      const { tags }  = selector.mainDataState
      console.log( selector )
      console.log( tags )
      return (
        <div>
          <Button variant="contained" size="small">
            +
          </Button>
          <Input
            onBlur={this.onInputBlur}
            value={tagName}
            onKeyPress={ev => {
              if ( ev.key === "Enter" ) {
                // Do code here
                ev.preventDefault()
                this.onEnterPress()
              }
            }}
          />
        </div>
      )
    }
  }
)
