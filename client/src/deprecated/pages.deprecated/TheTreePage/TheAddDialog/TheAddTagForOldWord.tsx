import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import AddTag from '@/components/AddTag'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { DictDataWord } from '@shared/__typings__/DictData'

class Props extends DefaultProps {
  word: DictDataWord
}
class State {}
class Style extends GlobalStyle {}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class TheAddTagForOldWord extends BasicComponent<Props, State > {
    state = { ...new State() }

    get currentTags(): Tag[] {
      const { word } = this.props
      return selector.getWordTags( word.id )
    }

    onAdd = ( tagName: string ) => {
      const { id: wordId } = this.props.word
      this.props.dispatch( {
        type: "core/ADD_WORD_ID_TO_TAG_NAME",
        wordId,
        tagName
      } )
    }

    onChipDelete  = ( tag: Tag ) => {
      const { id: wordId } = this.props.word
      this.props.dispatch( {
        type: "core/UPDATE_TAG_REMOVE_WORD_ID",
        tag,
        wordId
      } )
    }

    onAddRecentTagName = ( tagName: string ) => {
      this.dispatch( { type: 'treePageAddDialog/ADD_TO_RECENT_ADDED_TAG_NAMES_FOR_OLD_WORD', newName: tagName } )
    }

    render() {
      const { classes: c, dispatch, word } = this.props
      const { recentAddedTagNamesForOldWord } = selector.treePageAddDialogState
      const { currentTags } = this
      return (
        <AddTag
          tags={ currentTags }
          suggestTagNames={ selector.tagNames }
          recentAddedTagNames={ recentAddedTagNamesForOldWord }
          onAdd={ this.onAdd }
          onChipDelete={ this.onChipDelete }
          onAddRecentTagName={ this.onAddRecentTagName }
        />
      )
    }
  }
)