import CommonModelReducer from "../utils/CommonModelReducer"
import { defaultTree } from "../constants/default"
import { Tree, TreeNode } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"
import selector from "../selectors"
import { isPlainObject, isString } from "../utils/lodash"
import { removeArrayElement } from "../utils/js"

export enum TreeAddMode {
  Tree = "tree",
  WordId = "wordId"
}

export class TreeState {
  root: Tree = defaultTree
  // for showing current tree
  currentTreeId: string = defaultTree.id
  addMode: TreeAddMode = TreeAddMode.Tree

  
}

export default {
  namespace: "tree",
  state    : {
    ...new TreeState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      UPDATE_ADD_MODE = this.UPDATE_STATE_VALUE( "addMode" )

      ADD_TREE_NODE = (
        state: TreeState,
        { treeNode }: { treeNode: TreeNode }
      ) => {
        selector.currentTree.nodes.push( treeNode )
        return {
          ...state
        }
      }

      ADD_TREE = ( state: TreeState, { tree }: { tree: Tree } ) =>
        this.ADD_TREE_NODE( state, {
          treeNode: tree
        } )

      ADD_WORD_ID = ( state: TreeState, { wordId }: { wordId: string } ) =>
        this.ADD_TREE_NODE( state, {
          treeNode: wordId
        } )

      UPDATE_CURRENT_ID = this.UPDATE_STATE_VALUE( "currentTreeId" )

      UPDATE_CURRENT_ID_TO_UPPER_ID = ( state: TreeState ) => {
        const { currentTreeIdAbove } = selector
        return this.UPDATE_CURRENT_ID( state, { value: currentTreeIdAbove } )
      }

      UPDATE_TREE_NAME = ( state: TreeState, { tree, newName }: { tree: Tree, newName: string } ) => {
        tree.name = newName 
        return {
          ...state
        }
      }

      UPDATE_CURRENT_TREE_REMOVE_WORD_ID = ( state: TreeState, { wordId }: { wordId: string } ) => {
        removeArrayElement( selector.currentTree.nodes, wordId )
        return { ...state }
      }

      UPDATE_ALL_TREES_REMOVE_USELESS_WORD_IDS = ( state: TreeState ) => {
        const { root } = state
        new CalcTree( root ).removeUselessWordIds( selector.wordIds )
        return { ...state }
      }

      REMOVE_TREE = ( state, { tree }: { tree: Tree }  ) => {
        const treeAbove = selector.getTreeAbove( tree.id )
        removeArrayElement( treeAbove.nodes, tree  )
        return { ...state }
      }

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

export class CalcTree {
  tree: Tree

  constructor( tree: Tree ) {
    this.tree = tree
  }

  getTreeById( treeId: string ): Tree {
    let res: Tree = null
    const self = this
    function recurToGetTree( tree: Tree, id: string ) {
      if ( tree.id === id ) {
        // matched

        res = tree
      } else {
        // not matched
        const nodesTrees = getNodesTrees( tree )
        nodesTrees.forEach( newTree => recurToGetTree( newTree, id ) )
      }
    }
    recurToGetTree( this.tree, treeId )
    return res
  }

  getTreeAbove( treeId: string ): Tree {
    let res: Tree
    const self = this
    function recurToGetTree( tree: Tree, id: string ) {
      const nodesTrees = getNodesTrees( tree )
      const isIdInTreesBelow = nodesTrees.some( tree => tree.id === id )
      if ( isIdInTreesBelow ) {
        res = tree
      } else {
        nodesTrees.forEach( newTree => recurToGetTree( newTree, id ) )
      }
    }
    recurToGetTree( this.tree, treeId )
    return res
  }

  removeUselessWordIds( usefulWordIds: string[] ) {
    function recurToRemove( tree: Tree ) {
      const nodesWordIds = getNodesWordIds( tree )
      const removingIds = nodesWordIds.filter( id => !usefulWordIds.includes( id ) )

      const { nodes } = tree      
      removingIds.forEach( wordId => removeArrayElement( nodes, wordId ) )

      const nodesTrees = getNodesTrees( tree )
      nodesTrees.forEach( newTree => recurToRemove( newTree ) )
    }
    recurToRemove( this.tree )
  }
}
