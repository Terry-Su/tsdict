import { TreeNode, TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeColumn, TypeTreeItem } from '@/__typings__/tree'
import { NAME_TREE_ROOT } from '@/constants/names'
import { CalcTree } from '@/utils/getters/tree'
import { isPlainObject } from '@/utils/lodash'

import Review from './Review'
import Tag from './Tag'
import Word from './Word'

export default class Tree {
  word: Word;
  tag: Tag;
  review: Review

  tree: TypeTree;
  selections: TreeSelection[] = [];

  visibleTreePanel: boolean = false


  get treeIds(): number[] {
    let ids = []
    const recur = tree => {
      if ( isPlainObject( tree ) ) {
        ids.push( tree.id )
        tree.nodes.forEach( recur )
      }
    }
    recur( this.tree )
    return ids
  }

  get availableTreeId(): number {
    let num = 0
    while ( this.treeIds.includes( num ) ) {
      num++
    }
    return num
  }

  get createTree() {
    return (
      name: string,
      config: { id?: number; nodes?: TreeNode[] } = { nodes: [] }
    ) => ( {
      id   : config.id != null ? config.id : this.availableTreeId,
      name,
      nodes: config.nodes,
    } )
  }

  get allWordsTree(): TypeTree {
    const tree = this.createTree( "All", {
      id   : -2,
      nodes: <TreeNode[]>this.word.ids,
    } )
    return tree
  }

  get tagsTree(): TypeTree {
    const baseId = -3
    const tagTrees = this.tag.tags.map( ( tag: TypeTag, index ) => this.createTree( tag.name, {
        id   : baseId - 1 - index,
        nodes: tag.ids,
      } )
    )
    const tree = this.createTree( "Tags", {
      id   : baseId,
      nodes: <TreeNode[]>this.word.ids,
    } )
    return tree
  }

  get composedTree(): TypeTree {
    const nodes = [ this.allWordsTree, this.tree, this.tagsTree ].filter(
      v => v != null
    )
    const tree = this.createTree( NAME_TREE_ROOT, {
      id: -1,
      nodes,
    } )

    return tree
  }

  get composedCalcTree(): CalcTree {
    return new CalcTree( this.composedTree )
  }

  get columns(): TypeTreeColumn[] {
    const { composedCalcTree } = this
    let res: TypeTreeColumn[] = [ ]

    const { selections } = this
    let currentColumnIndex = 0
    let currentCalcTree: CalcTree = composedCalcTree
    while ( currentCalcTree != null )  {
      // # add column
      const column = currentCalcTree.nodes.map( node => ( {
        type: node.type,
        id  : node.id,
      } ) )
      res.push( column ) 

      const currentSelection = selections[ currentColumnIndex ]
      if ( currentSelection == null ) {
        break
      }
      currentCalcTree = currentCalcTree.nodes.find(
        node  => node.type === currentSelection.type && node.id === currentSelection.id
      ) 
      currentColumnIndex++
    }


    return res
  }

  get getTreeById(): Function {
    const self = this
    return function( id: TypeId ): TypeTree {
      let res
      const recur = ( tree: TreeNode ) => {
        if ( typeof tree === "object" ) {
          if ( id === tree.id ) {
            res = tree
          }
          tree.nodes.forEach( recur )
        }
      }
      recur( self.composedTree )
      return res
    }
  }

  get getSelectionsByTreeId(): Function {
    const self = this
    return function( id: TypeId ) {
      const targetCalcTree = self.composedCalcTree.getCalcTreeByTreeId( id )
      return targetCalcTree.selections
    }
  }

  get shallShowTreePanel(): boolean {
    return this.visibleTreePanel || this.review.isReviewMode
  }

  SET_TREE = ( tree: TypeTree ) => {
    this.tree = tree
  };
  SET_SELECTIONS = ( selections: TreeSelection[] ) => {
    this.selections = selections
  };

  SHOW_TREE_PANEL = () => { this.visibleTreePanel = true }
  HIDE_TREE_PANEL = () => { this.visibleTreePanel = false }
  TOOGLE_TREE_PANEL = () => { this.visibleTreePanel = ! this.visibleTreePanel }

  initialize() {
    if ( this.selections.length === 0 && this.tree ) {
    }
  }

  selectTree( id: string ) {
    const newSelections = this.getSelectionsByTreeId( id )
    this.SET_SELECTIONS( newSelections )
  }
}
