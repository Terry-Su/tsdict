import { TreeNode, TypeId, TypeTag, TypeTree } from '@/__typings__'
import { TreeItemType, TreeSelection, TypeTreeColumn, TypeTreeItem, SORT_TYPES } from '@/__typings__/tree'
import { TypeWord } from '@/__typings__/word'
import { TREE_ALL_WORDS, TREE_COMPOSED_TREE_ROOT, TREE_TAG_ROOT } from '@/constants/ids'
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
  tag: Tag
  review: Review;

  tree: TypeTree = this.createTree('Root')
  selections: TreeSelection[] = [];
  lastSelections: TreeSelection[] = [];

  visibleTreePanel: boolean = true;

  /**
   * 0: no sort
   * 1: sort by level
   * 2: sort by create time
   */
  sortType:SORT_TYPES = SORT_TYPES.LEVEL

  get treeIds (): number[] {
    const ids = []
    const recur = tree => {
      if (isPlainObject(tree)) {
        ids.push(tree.id)
        tree.nodes.forEach(recur)
      }
    }
    recur(this.tree)
    return ids
  }

  get availableTreeId (): number {
    let num = 0
    while (this.treeIds.includes(num)) {
      num++
    }
    return num
  }

  get createTree () {
    return (
      name: string,
      config: { id?: TypeId; nodes?: TreeNode[] } = { nodes: [] }
    ) => ({
      id: config.id != null ? config.id : this.availableTreeId,
      name,
      nodes: config.nodes
    })
  }

  get isTreeTree (): Function {
    return (tree: TypeTree): boolean => this.treeIds.includes(tree.id)
  }

  get isTreeRootTree (): Function {
    return (tree: TypeTree): boolean => tree === this.tree
  }

  get isComposedTreeRootTree (): Function {
    return (tree: TypeTree): boolean => tree.id === TREE_COMPOSED_TREE_ROOT
  }

  get isTagTree (): Function {
    return (tree: TypeTree): boolean => this.tagTreeIds.includes(tree.id)
  }

  get isTagRootTree (): Function {
    return (tree: TypeTree): boolean => tree.id === TREE_TAG_ROOT
  }

  get isTreeAllWords (): Function {
    return (tree: TypeTree): boolean => tree.id === TREE_ALL_WORDS
  }

  get allWordsTree (): TypeTree {
    const tree = this.createTree('All', {
      id: TREE_ALL_WORDS,
      nodes: <TreeNode[]> this.word.ids
    })
    return tree
  }

  get tagTreeIds (): TypeId[] {
    return this.tag.tags.map((tag, index) => (TREE_TAG_ROOT - 1 - index))
  }

  get tagTrees (): TypeTree {
    const baseId = TREE_TAG_ROOT
    const tagTrees = this.tag.tags.map((tag: TypeTag, index) => this.createTree(tag.name, {
      id: this.tagTreeIds[index],
      nodes: tag.ids
    })
    )
    const tree = this.createTree('Tags', {
      id: baseId,
      nodes: <TreeNode[]>tagTrees
    })
    return tree
  }

  get rootCalcTree (): CalcTree {
    return new CalcTree(this.tree)
  }

  get composedTree (): TypeTree {
    const nodes = [this.allWordsTree, this.tree, this.tagTrees].filter(
      v => v != null
    )
    const tree = this.createTree(NAME_TREE_ROOT, {
      id: TREE_COMPOSED_TREE_ROOT,
      nodes
    })

    return tree
  }

  get composedCalcTree (): CalcTree {
    return new CalcTree(this.composedTree)
  }

  get columns (): TypeTreeColumn[] {
    const { composedCalcTree } = this
    const res: TypeTreeColumn[] = []

    const { selections } = this
    let currentColumnIndex = 0
    let currentCalcTree: CalcTree = composedCalcTree
    while (currentCalcTree != null) {
      // # add column
      const column = currentCalcTree.nodes.map(node => ({
        type: node.type,
        id: node.id
      }))
      res.push(column)

      const currentSelection = selections[currentColumnIndex]
      if (currentSelection == null || currentSelection.type === TreeItemType.Word) {
        break
      }
      currentCalcTree = currentCalcTree.nodes.find(
        node => node.type === currentSelection.type && node.id === currentSelection.id
      )
      currentColumnIndex++
    }
    return res
  }

  get getTreeById (): Function {
    const self = this
    return function (id: TypeId): TypeTree {
      let res
      const recur = (tree: TreeNode) => {
        if (typeof tree === 'object') {
          if (id === tree.id) {
            res = tree
          }
          tree.nodes.forEach(recur)
        }
      }
      recur(self.composedTree)
      return res
    }
  }

  // # selections
  get getSelectionsByTreeId (): Function {
    const self = this
    return function (id: TypeId) {
      const targetCalcTree = self.composedCalcTree.getCalcTreeByTreeId(id)
      return targetCalcTree.selections
    }
  }

  get getSelectionsByTag (): Function {
    const self = this
    return function (tag: TypeTag) {
      const tagRootCalcTree = self.composedCalcTree.getCalcTreeByTreeId(TREE_TAG_ROOT)
      const targetCalcTree = tagRootCalcTree.nodes.find(node => node.name === tag.name)
      return targetCalcTree.selections
    }
  }

  get currentSelectedTree (): TypeTree {
    const potentialSelection = this.selections[this.selections.length - 1]

    if (potentialSelection != null) {
      if (potentialSelection.type === TreeItemType.Tree) {
        return this.getTreeById(potentialSelection.id)
      } else {
        const selection = this.selections[this.selections.length - 2]
        if (selection) {
          return this.getTreeById(selection.id)
        }
      }
    }
    return null
  }

  get currentSelectedTreeWordIds (): TypeId[] {
    if (this.currentSelectedTree != null) {
      return this.currentSelectedTree.nodes.filter(node => isTreeNodeWord(node)) as TypeId[]
    }
    return []
  }

  get currentSelectedTreeWords (): TypeWord[] {
    return this.currentSelectedTreeWordIds.map(wordId => this.word.words.find(word => word.id === wordId))
  }

  get currentSelectedTreeRecursivelyChildrenWords (): TypeWord[] {
    let wordIds: TypeId[] = []
    const { currentSelectedTree } = this
    if (currentSelectedTree) {
      const recur = (tree: TypeTree) => {
        if (tree.nodes && tree.nodes.length > 0) {
          const childWordIds: TypeId[] = <TypeId[]>tree.nodes.filter(isTreeNodeWord)
          if (childWordIds.length > 0) {
            wordIds = wordIds.concat(childWordIds)
          }
          const childTrees = tree.nodes.filter(isTreeNodeTree)
          childTrees.forEach(recur)
        }
      }
      recur(currentSelectedTree)
    }
    const res = wordIds.map(wordId => this.word.words.find(word => word.id === wordId))
    return res
  }

  get getTreeRecursiveChidlrenWordNodesNotReviewedLength () {
    return (tree: TypeTree): number => {
      let res = 0
      const recur = (tree: TypeTree) => {
        tree.nodes.filter(isTreeNodeWord).forEach(wordId => {
          const word = this.word.words.find(item => item.id === wordId)
          if (word && (word.reviewLevel == null)) {
            res++
          }
        })
        tree.nodes.filter(isTreeNodeTree).forEach(recur)
      }
      recur(tree)
      return res
    }
  }

  SET_TREE = (tree: TypeTree) => {
    this.tree = tree
  };

  SET_TREE_NAME = (tree: TypeTree, newName: string) => {
    tree.name = newName
  };

  SET_SELECTIONS = (selections: TreeSelection[]) => {
    this.selections = selections
  };

  SET_LAST_SELECTION = (selections: TreeSelection[]) => { this.lastSelections = selections }

  ADD_TREE = (name: string, parentTree: TypeTree) => {
    name.trim() === '' && alert('Empty word name!')
    const newTree = this.createTree(name)
    parentTree.nodes.push(newTree)
  };

  ADD_TREE_WORD_ID (tree: TypeTree, wordId: TypeId) {
    const existed = tree.nodes.includes(wordId)
    !existed && tree.nodes.push(wordId)
  }

  DELETE_TREE_BY_ID = (treeId: TypeId) => {
    let foundTargetTree = false
    const recur = (treeNode: TreeNode) => {
      if (isTreeNodeTree(treeNode)) {
        const targetTree = (treeNode as TypeTree).nodes.find(node => (node as TypeTree).id === treeId)

        if (targetTree != null) {
          removeArrayElement((treeNode as TypeTree).nodes, targetTree)
          foundTargetTree = true
        }

        !foundTargetTree && (treeNode as TypeTree).nodes.forEach(recur)
      }
    }

    recur(this.tree)
  };

  DELETE_WORD_ID_IN_TREE (wordId: TypeId, tree: TypeTree) {
    removeArrayElement(tree.nodes, wordId)
  }

  DELETE_WORD_ID_RECURVELY_IN_TREE (wordId: TypeId) {
    const recur = (treeNode: TreeNode) => {
      if (isTreeNodeTree(treeNode)) {
        const targetWordIds = [];

        (treeNode as TypeTree).nodes.forEach((node, index) => {
          if (isTreeNodeWord(node) && (node as TypeId) === wordId) {
            targetWordIds.push(node)
          }
        })

        targetWordIds.forEach(targetWordId => {
          removeArrayElement((treeNode as TypeTree).nodes, targetWordId)
        });

        (treeNode as TypeTree).nodes.forEach(recur)
      }
    }

    recur(this.tree)
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

  SET_SORT_TYPE = type => { this.sortType = type }

  initialize () {
    if (this.selections.length === 0 && this.tree) {
    }
  }

  setSelections (selections: TreeSelection[]) {
    this.SET_SELECTIONS(selections)
    this.SET_LAST_SELECTION(selections)
  }

  selectTree (id: TypeId) {
    const newSelections = this.getSelectionsByTreeId(id)
    this.setSelections(newSelections)
  }

  selectWord (wordId: TypeId, parentTree: TypeTree) {
    const parentTreeSelections = this.getSelectionsByTreeId(parentTree.id)
    const newSelections = [
      ...parentTreeSelections,
      {
        type: TreeItemType.Word,
        id: wordId
      }
    ]
    this.setSelections(newSelections)
  }

  renameTree (tree: TypeTree, newName: string) {
    if (newName == null || newName.trim() === '') {
      return
    }
    tree != null && this.SET_TREE_NAME(tree, newName)
  }

  addTreeWordByName (wordName: string, tree: TypeTree) {
    if (wordName == null || emptyString(wordName)) { return }

    const word = this.word.getWordByName(wordName)
    let targetWord: TypeWord
    if (word == null) {
      this.word.addWord(wordName)
      targetWord = this.word.getWordByName(wordName)
    } else {
      targetWord = word
    }
    targetWord != null && this.ADD_TREE_WORD_ID(tree, targetWord.id)
  }

  selectTag (tag: TypeTag) {
    const newSelections = this.getSelectionsByTag(tag)
    this.setSelections(newSelections)
  }
}
