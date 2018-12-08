import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import DownSuggest from '@/components/DownSuggest/DownSuggest'
import DownSuggestContainer from '@/components/DownSuggest/DownSuggestContainer'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import TagIcon from '@material-ui/icons/LocalOffer'

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
      setTimeout( () => {
        const { tagName } = this.state
        !( tagName.trim() === "" ) && this.addWordToTagName()
        this.setState( { tagName: "" } )
        this.setState( { isIntputing: false } )
      }, 200 )
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

    onDownSuggestItemClick = tagName => {
      this.setState( { tagName }, () => {
        !( tagName.trim() === "" ) && this.addWordToTagName()
        this.setState( { tagName: "" } )
        this.setState( { isIntputing: false } )
      } )
    }
    render() {
      const { tagName, isIntputing } = this.state
      const { currentTags, tagNames } = selector
      return (
        <div>
          {currentTags.map( tag => (
            <span key={tag.id}>
              <Chip label={tag.name} onDelete={() => this.onChipDelete( tag )} />
              &nbsp;&nbsp;
            </span>
          ) )}
          {!isIntputing && (
            <IconButton onClick={this.onAddClick}>
              <TagIcon color="action" />
            </IconButton>
          )}

          {isIntputing && (
            <DownSuggestContainer>
              <Input
                autoFocus
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
              <DownSuggest
                text={tagName}
                texts={tagNames}
                onItemClick={this.onDownSuggestItemClick}
                enableTextsWhenEmpty
              />
            </DownSuggestContainer>
          )}
        </div>
      )
    }
  }
)
