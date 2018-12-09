import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import AddTag from '@/components/AddTag'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

class Props extends DefaultProps {}
class State {}
class Style extends GlobalStyle {}

export default mapStateAndStyle<Props>( new Style() )(
  class TheAddTag extends BasicComponent<Props, State > {
    state = new State()

    onAdd = ( tagName: string ) => {
      const { id: wordId } = selector.currentWord
      this.props.dispatch( {
        type: "core/ADD_WORD_ID_TO_TAG_NAME",
        wordId,
        tagName
      } )
    }

    onChipDelete  = ( tag: Tag ) => {
      const { id: wordId } = selector.currentWord
      this.props.dispatch( {
        type: "core/UPDATE_TAG_REMOVE_WORD_ID",
        tag,
        wordId
      } )
    }

    onAddRecentTagName = ( tagName: string ) => {
      this.dispatch( { type: 'app/ADD_TO_RECENT_ADDED_TAG_NAMES', newName: tagName } )
    }

    render() {
      const { classes: c, dispatch } = this.props
      const { recentAddedTagNames } = selector.appState

      return (
        <AddTag
          tags={ selector.currentTags }
          suggestTagNames={ selector.tagNames }
          recentAddedTagNames={ recentAddedTagNames }
          onAdd={ this.onAdd }
          onChipDelete={ this.onChipDelete }
          onAddRecentTagName={ this.onAddRecentTagName }
        />
      )
    }
  }
)