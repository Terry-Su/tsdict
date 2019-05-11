import { TreeNode, TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeColumn, TypeTreeItem } from '@/__typings__/tree'
import { TypeWord } from '@/__typings__/word'
import { TREE_ALL_WORDS, TREE_TAG_ROOT, TREE_TREE_ROOT } from '@/constants/ids'
import { NAME_TREE_ROOT } from '@/constants/names'
import { emptyString } from '@/utils/getters'
import { CalcTree, isTreeNodeTree, isTreeNodeWord } from '@/utils/getters/tree'
import { removeArrayElement } from '@/utils/js'
import { isPlainObject } from '@/utils/lodash'

import Review from './Review'
import Tag from './Tag'
import Word from './Word'

export default class Tree {
  word: Word;
  tag: Tag;
  review: Review;

  tree: TypeTree;
  selections: TreeSelection[] = [];

  visibleTreePanel: boolean = true;

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
      config: { id?: TypeId; nodes?: TreeNode[] } = { nodes: [] }
    ) => ( {
      id   : config.id != null ? config.id : this.availableTreeId,
      name,
      nodes: config.nodes,
    } )
  }

  get allWordsTree(): TypeTree {
    const tree = this.createTree( "All", {
      id   : TREE_ALL_WORDS,
      nodes: <TreeNode[]>this.word.ids,
    } )
    return tree
  }

  get tagTreeIds(): TypeId[] {
    return this.tag.tags.map( ( tag ,index ) => ( TREE_TAG_ROOT - 1 - index ) )
  }

  get tagTrees(): TypeTree {
    const baseId = TREE_TAG_ROOT
    const tagTrees = this.tag.tags.map( ( tag: TypeTag, index ) => this.createTree( tag.name, {
        id   : this.tagTreeIds[ index ],
        nodes: tag.ids,
      } )
    )
    const tree = this.createTree( "Tags", {
      id   : baseId,
      nodes: <TreeNode[]>tagTrees,
    } )
    return tree
  }

  get composedTree(): TypeTree {
    const nodes = [ this.allWordsTree, this.tree, this.tagTrees ].filter(
      v => v != null
    )
    const tree = this.createTree( NAME_TREE_ROOT, {
      id: TREE_TREE_ROOT,
      nodes,
    } )

    return tree
  }

  get composedCalcTree(): CalcTree {
    return new CalcTree( this.composedTree )
  }

  get columns(): TypeTreeColumn[] {
    const { composedCalcTree } = this
    let res: TypeTreeColumn[] = []

    const { selections } = this
    let currentColumnIndex = 0
    let currentCalcTree: CalcTree = composedCalcTree
    while ( currentCalcTree != null ) {
      // # add column
      const column = currentCalcTree.nodes.map( node => ( {
        type: node.type,
        id  : node.id,
      } ) )
      res.push( column )

      const currentSelection = selections[ currentColumnIndex ]
      if ( currentSelection == null || currentSelection.type === TreeItemType.Word ) {
        break
      }
      currentCalcTree = currentCalcTree.nodes.find(
        node => node.type === currentSelection.type && node.id === currentSelection.id
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

  get getSelectionsByTag(): Function {
    const self = this
    return function ( tag: TypeTag ) {
      const tagRootCalcTree = self.composedCalcTree.getCalcTreeByTreeId( TREE_TAG_ROOT )
      const targetCalcTree = tagRootCalcTree.nodes.find( node => node.name === tag.name )
      return targetCalcTree.selections
    }
  }


  SET_TREE = ( tree: TypeTree ) => {
    this.tree = tree
  };

  SET_TREE_NAME = ( tree: TypeTree, newName: string ) => {
    tree.name = newName
  };

  SET_SELECTIONS = ( selections: TreeSelection[] ) => {
    this.selections = selections
  };

  ADD_TREE = ( name: string, parentTree: TypeTree ) => {
    name.trim() === "" && alert( "Empty word name!" )
    const newTree = this.createTree( name )
    parentTree.nodes.push( newTree )
  };

  DELETE_TREE_BY_ID = ( treeId: TypeId ) => {
    let foundTargetTree = false
    const recur = ( treeNode: TreeNode ) => {
      if ( isTreeNodeTree( treeNode ) ) {
        const targetTree = ( treeNode as TypeTree ).nodes.find( node => ( node as TypeTree ).id === treeId )

        if ( targetTree != null ) {
          removeArrayElement( ( treeNode as TypeTree ).nodes, targetTree )
          foundTargetTree = true
        }  
        
        ! foundTargetTree && ( treeNode as TypeTree ).nodes.forEach( recur )
      }
    }

    recur( this.tree )
  };

  DELETE_WORD_ID_IN_TREE( wordId: TypeId, tree: TypeTree ) {
    removeArrayElement( tree.nodes, wordId )
  }

  DELETE_WORD_ID_RECURVELY_IN_TREE( wordId: TypeId ) {
    const recur = ( treeNode: TreeNode ) => {
      if ( isTreeNodeTree( treeNode ) ) {
        let targetWordIds = [];

        ( treeNode as TypeTree ).nodes.forEach( ( node, index ) => {
          if ( isTreeNodeWord( node ) && ( node as TypeId ) === wordId ) {
            targetWordIds.push( node )
          }
        } )

        targetWordIds.forEach( targetWordId => {
          removeArrayElement( ( treeNode as TypeTree ).nodes, targetWordId )
        } );

        ( treeNode as TypeTree ).nodes.forEach( recur )
      }
    }

    recur( this.tree )
  }

  SHOW_TREE_PANEL = () => {
    this.visibleTreePanel = true
  };
  HIDE_TREE_PANEL = () => {
    this.visibleTreePanel = false
  };
  TOOGLE_TREE_PANEL = () => {
    this.visibleTreePanel = !this.visibleTreePanel
  };

  initialize() {
    if ( this.selections.length === 0 && this.tree ) {
    }
  }

  selectTree( id: TypeId ) {
    const newSelections = this.getSelectionsByTreeId( id )
    this.SET_SELECTIONS( newSelections )
  }

  selectWord( wordId: TypeId, parentTree: TypeTree ) {
    const parentTreeSelections = this.getSelectionsByTreeId( parentTree.id )
    const newSelections = [
      ...parentTreeSelections,
      {
        type: TreeItemType.Word,
        id  : wordId,
      },
    ]
    this.SET_SELECTIONS( newSelections )
  }

  renameTree( tree: TypeTree, newName: string ) {
    if ( newName == null || newName.trim() === "" ) {
      return
    }
    tree != null && this.SET_TREE_NAME( tree, newName )
  }

  addTreeWordByName( wordName: string, tree: TypeTree ) {
    if ( wordName == null || emptyString( wordName ) ) { return }
    
    const word = this.word.getWordByName( wordName )
    let targetWord: TypeWord
    if ( word == null ) {
      this.word.ADD_WORD( wordName )
      targetWord = this.word.getWordByName( wordName )
    } else {
      targetWord = word
    }
    targetWord != null && tree.nodes.push( targetWord.id )
  }

  selectTag( tag: TypeTag ) {
    const newSelections = this.getSelectionsByTag( tag )
    this.SET_SELECTIONS( newSelections )
  }
}
