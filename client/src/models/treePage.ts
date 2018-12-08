import { isPlainObject } from 'lodash'
import { isString } from 'util'

import { Tree, TreeNode } from '@/__typings__'
import { SortType } from '@/components/SortSection'
import { defaultTree } from '@/constants/default'
import selector from '@/selectors'
import CommonModelReducer from '@/utils/CommonModelReducer'
import getUniqueId from '@/utils/getUniqueId'
import { removeArrayElement } from '@/utils/js'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

import { CalcTree } from './core'

export enum TreeAddMode {
  Tree = "tree",
  WordId = "wordId"
}

export class TreePageState {
  // for showing current tree
  currentTreeId: string = defaultTree.id

  addMode: TreeAddMode = TreeAddMode.Tree 
  
  isAddDialogOpen: boolean = false

  isTreeFunctionDialogOpen: boolean = false
  isWordFunctionDialogOpen: boolean = false

  longPressingTree: Tree
  longPressingWord: DictDataWord

  isRenameDialogOpen: boolean = false
  renamingName: string = ''
  callbackAfterRenamed: Function

  // top bar: sort
  sortType: SortType = SortType.Name
  isAscendingName: boolean = true
  isAscendingDegree: boolean = true
  // top bar: filter
  startDegree: DictDataWordDegree = 0
  endDegree: DictDataWordDegree = 10
  selectedTagIds: string[] = []
}

export default {
  namespace: "treePage",
  state    : {
    ...new TreePageState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      UPDATE_ADD_MODE = this.UPDATE_STATE_KEY( "addMode" )

      ADD_TREE_NODE = (
        state: TreePageState,
        { treeNode }: { treeNode: TreeNode }
      ) => {
        selector.currentTree.nodes.push( treeNode )
        return {
          ...state
        }
      }

      ADD_TREE = ( state: TreePageState, { tree }: { tree: Tree } ) =>
        this.ADD_TREE_NODE( state, {
          treeNode: tree
        } )

      ADD_WORD_ID = ( state: TreePageState, { wordId }: { wordId: string } ) =>
        this.ADD_TREE_NODE( state, {
          treeNode: wordId
        } )

      UPDATE_CURRENT_TREE_ID = this.UPDATE_STATE_KEY( "currentTreeId" )

      UPDATE_CURRENT_ID_TO_UPPER_ID = ( state: TreePageState ) => {
        const { currentTreeIdAbove } = selector
        return this.UPDATE_CURRENT_TREE_ID( state, { value: currentTreeIdAbove } )
      }

      UPDATE_CURRENT_TREE_REMOVE_WORD_ID = ( state: TreePageState, { wordId }: { wordId: string } ) => {
        removeArrayElement( selector.currentTree.nodes, wordId )
        return { ...state }
      }

      
      SHOW_ADD_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isAddDialogOpen', true )
      HIDE_ADD_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isAddDialogOpen', false )

      SHOW_TREE_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isTreeFunctionDialogOpen', true )
      HIDE_TREE_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isTreeFunctionDialogOpen', false )

      SHOW_WORD_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isWordFunctionDialogOpen', true )
      HIDE_WORD_FUNCTION_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isWordFunctionDialogOpen', false )

      UPDATE_LONG_PRESSING_TREE = this.UPDATE_STATE_KEY( 'longPressingTree' )

      UPDATE_LONG_PRESSING_WORD = this.UPDATE_STATE_KEY( 'longPressingWord' )

      SHOW_RENAME_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isRenameDialogOpen', true )
      HIDE_RENAME_DIALOG = this.UPDATE_STATE_KEY_VALUE( 'isRenameDialogOpen', false )
      UPDATE_CALLBACK_AFTER_RENAMED = this.UPDATE_STATE_KEY( 'callbackAfterRenamed' )
      UPDATE_RENAMING_NAME= this.UPDATE_STATE_KEY( 'renamingName' )

      // top bar: sort
      UPDATE_SORT_TYPE = this.UPDATE_STATE_KEY( 'sortType' )
      UPDATE_IS_ASCENDING_NAME = this.UPDATE_STATE_KEY( 'isAscendingName' )
      UPDATE_IS_ASCENDING_DEGREE = this.UPDATE_STATE_KEY( 'isAscendingDegree' )
      // top bar: filter
      UPDATE_START_DEGREE = this.UPDATE_STATE_KEY( 'startDegree' )
      UPDATE_END_DEGREE = this.UPDATE_STATE_KEY( 'endDegree' )
      UPDATE_SELECTED_TAG_IDS = this.UPDATE_STATE_KEY( 'selectedTagIds' )
    }()
  },
  effects: {}
}

export const createTree = (
  name: string,
  config: { nodes?: TreeNode[] } = { nodes: [] }
): Tree => ( {
  id   : getUniqueId(),
  name,
  nodes: config.nodes
} )

export function getNodesTrees( tree: Tree ): Tree[] {
  return tree.nodes.filter( node => isPlainObject( node ) ) as Tree[]
}

export function getNodesWordIds( tree: Tree ): string[] {
  return tree.nodes.filter( node => isString( node ) ) as string[]
}


