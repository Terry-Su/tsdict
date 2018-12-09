import { uniq } from 'lodash'

import { Tag } from '@/__typings__'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { removeArrayElement } from '@/utils/js'

export class TreePageAddDialogState {
  currentTags: Tag[] = []
  recentAddedTagNames: string[] = []
  recentAddedTagNamesForOldWord: string[] = []
}

export default {
  namespace: "treePageAddDialog",
  state    : {
    ...new TreePageAddDialogState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      RESTORE = () => new TreePageAddDialogState()

      ADD_TO_CURRENT_TAGS = (   
        state: TreePageAddDialogState,
        { newTag }:  { newTag:  Tag }
      ) => {
        state.currentTags.push( newTag )
        return { ...state }
      }

      REMOVE_FROM_CURRENT_TAGS = (   
        state: TreePageAddDialogState,
        { tag }:  { tag:  Tag }
      ) => {
        removeArrayElement( state.currentTags, tag )
        return { ...state }
      }

      ADD_TO_RECENT_ADDED_TAG_NAMES = ( state: TreePageAddDialogState, { newName }: {newName: string} )=> {
        const { recentAddedTagNames } = state
        recentAddedTagNames.unshift( newName )
        state.recentAddedTagNames = uniq( recentAddedTagNames )
        return { ...state }
      }

      ADD_TO_RECENT_ADDED_TAG_NAMES_FOR_OLD_WORD = ( state: TreePageAddDialogState, { newName }: {newName: string} )=> {
        const { recentAddedTagNames } = state
        recentAddedTagNames.unshift( newName )
        state.recentAddedTagNames = uniq( recentAddedTagNames )
        return { ...state }
      }
    }()
  },
  effects: {}
}
