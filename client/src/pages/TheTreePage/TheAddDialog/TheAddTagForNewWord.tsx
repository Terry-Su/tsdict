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

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class TheAddTagForNewWord extends BasicComponent<Props, State > {
    state = { ...new State() }

    onAdd = ( tagName: string ) => {
      const newTag = selector.getTagByTagName( tagName )
      this.props.dispatch( {
        type: "treePageAddDialog/ADD_TO_CURRENT_TAGS",
        newTag
      } )
    }

    onChipDelete  = ( tag: Tag ) => {
      this.props.dispatch( {
        type: "treePageAddDialog/REMOVE_FROM_CURRENT_TAGS",
        tag,
      } )
    }

    onAddRecentTagName = ( tagName: string ) => {
      this.dispatch( { type: 'treePageAddDialog/ADD_TO_RECENT_ADDED_TAG_NAMES', newName: tagName } )
    }

    render() {
      const { classes: c, dispatch } = this.props
      const { currentTags, recentAddedTagNames } = selector.treePageAddDialogState
      const { tagNames  } = selector

      return (
        <AddTag
          tags={ currentTags }
          suggestTagNames={ tagNames }
          recentAddedTagNames={ recentAddedTagNames }
          onAdd={ this.onAdd }
          onChipDelete={ this.onChipDelete }
          onAddRecentTagName={ this.onAddRecentTagName }
        />
      )
    }
  }
)