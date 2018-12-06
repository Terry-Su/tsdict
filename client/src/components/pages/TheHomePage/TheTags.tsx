import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import Chip from "@material-ui/core/Chip"
import selector from "../../../selectors"
import { Tag } from "../../../__typings__"

export default mapStateAndStyle()(
  class TheTags extends Component<
    any,
    {
      tagName: string
      isIntputing: boolean
    }
  > {
    state = {
      tagName    : "",
      isIntputing: false
    }
    onInputChange = e => this.setState( { tagName: e.target.value } )
    onAddClick = () => {
      this.setState( { isIntputing: true } )
    }
    onInputBlur = () => {
      const { tagName } = this.state
      !( tagName.trim() === "" ) && this.addWordToTagName()
      this.setState( { tagName: "" } )
      this.setState( { isIntputing: false } )
    }
    onEnterPress = () => {
      this.onInputBlur()
    }
    addWordToTagName() {
      const { tagName } = this.state
      const { id: wordId } = selector.currentWord
      this.props.dispatch( {
        type: "core/ADD_WORD_ID_TO_TAG_NAME",
        wordId,
        tagName
      } )
    }
    onChipDelete = ( tag: Tag ) => {
      const { id: wordId } = selector.currentWord
      this.props.dispatch( {
        type: "core/UPDATE_TAG_REMOVE_WORD_ID",
        tag,
        wordId
      } )
    }
    render() {
      const { tagName, isIntputing } = this.state
      const { currentTags } = selector
      return (
        <div>
          {currentTags.map( tag => (
            <span key={tag.id}>
              <Chip label={tag.name} onDelete={() => this.onChipDelete( tag )} />
              &nbsp;&nbsp;
            </span>
          ) )}
          {!isIntputing && (
            <Button variant="contained" size="small" onClick={this.onAddClick}>
              +
            </Button>
          )}

          {isIntputing && (
            <Input
              onBlur={this.onInputBlur}
              value={tagName}
              onChange={this.onInputChange}
              onKeyPress={ev => {
                if ( ev.key === "Enter" ) {
                  // Do code here
                  ev.preventDefault()
                  this.onEnterPress()
                }
              }}
            />
          )}
        </div>
      )
    }
  }
)
