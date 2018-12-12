import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle, GS } from '@/style/globalStyle'
import { removeArrayElement } from '@/utils/js'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Chip, IconButton, Input } from '@material-ui/core'
import TagIcon from '@material-ui/icons/LocalOffer'

import DownSuggest from './DownSuggest/DownSuggest'
import DownSuggestContainer from './DownSuggest/DownSuggestContainer'

class Props extends DefaultProps {
  tags: Tag[]
  suggestTagNames: []

  onAdd: ( tagName: string ) => {}
  onChipDelete = ( tag: Tag ) => {}
  onAddRecentTagName = ( tagName: string ) => {}
  recentAddedTagNames: string[]
}
class State {
  inputTagName: string = ''
  isIntputing: boolean = false
}
class Style extends GlobalStyle {}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class AddTag extends BasicComponent<Props, State > {
    state = { ...new State() }

    get potentialSuggestions(): string[]{
      const { suggestTagNames = [], tags } = this.props
      const tagNames = tags.map( tag => tag.name )
      return suggestTagNames.filter( name => ! tagNames.includes( name ) )
    }

    onAddClick = () => {
      this.setState( { isIntputing: true } )
    }

    onChipDelete = ( tag: Tag ) => {
      const { onChipDelete } = this.props
      onChipDelete && onChipDelete( tag )
    }

    onInputBlur = () => {
      const { inputTagName } = this.state
      const { onAdd } = this.props
      if ( !( inputTagName.trim() === "" ) ) {
        onAdd && onAdd( inputTagName )
      }
      this.setState( { inputTagName: "" } )
      this.setState( { isIntputing: false } )
    }

    onInputChange = e => {
      this.setState( { inputTagName: e.target.value } )
    }

    onEnterPress = () => {
      this.onInputBlur()
    }

    onMouseDownSuggestItemClick = ( tagName: string ) => {
      this.setState( { inputTagName: tagName }, () => {
        this.onInputBlur()
        const { onAddRecentTagName } = this.props
        onAddRecentTagName && onAddRecentTagName( tagName )
      } )
    }

    render() {
      const { classes: c, dispatch, tags = [], recentAddedTagNames = [] } = this.props
      const { isIntputing, inputTagName } = this.state
      const { potentialSuggestions } = this
      return (
        <div className={c.d_ib}>
          {tags.map( tag => (
            <span key={tag.id}>
              <Chip label={tag.name} onDelete={ () => this.onChipDelete( tag ) } />
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
                value={inputTagName}
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
                text={inputTagName}
                texts={potentialSuggestions}
                onItemMouseDown={this.onMouseDownSuggestItemClick}
                enableTextsWhenEmpty
                recentTexts={recentAddedTagNames}
              />
            </DownSuggestContainer>
          )}
        </div>
      )
    }
  }
)