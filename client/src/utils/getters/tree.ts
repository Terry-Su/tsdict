import { TreeNode, TypeId, TypeTree, WordId } from '@/__typings__'
import { TreeItemType } from '@/__typings__/tree'
import { TypeWord } from '@/__typings__/word'

export const isTreeNodeTree = (tree: TreeNode) => tree != null && typeof tree === 'object'
export const isTreeNodeWord = (tree: TreeNode) => !isTreeNodeTree(tree)

export class CalcTree {
  type: TreeItemType
  id: TypeId
  name?: string
  parent: CalcTree
  nodes: CalcTree[] = []

  constructor (tree: TreeNode, parent?:CalcTree) {
    this.parent = parent
    if (isTreeNodeTree(tree)) {
      this.type = TreeItemType.Tree
      this.id = (tree as TypeTree).id
      this.name = (tree as TypeTree).name
      this.nodes = (tree as TypeTree).nodes.map(node => new CalcTree(node, this))
    } else {
      this.type = TreeItemType.Word
      this.id = tree as TypeId
    }
  }

  get wordNodes (): CalcTree[] {
    return this.nodes.filter(node => node.type === TreeItemType.Word)
  }

  get treeNodes (): CalcTree[] {
    return this.nodes.filter(node => node.type === TreeItemType.Tree)
  }

  get selections () {
    const res = [{
      id: this.id,
      type: this.type
    }]
    let tree: CalcTree = this
    while (tree.parent != null) {
      const { id, type } = tree.parent
      const notRoot = tree.parent.parent != null
      notRoot && res.unshift({
        id,
        type
      })
      tree = tree.parent
    }
    return res
  }

  get pathName (): string {
    const trees: CalcTree[] = [this]
    const recur = (tree: CalcTree) => {
      if (tree.parent != null) {
        trees.unshift(tree.parent)
        recur(tree.parent)
      }
    }
    recur(this)
    return trees.map(tree => tree.name).join('/')
  }

  getCalcTreeByTreeId (id: TypeId): CalcTree {
    let res = null
    const recur = (tree: CalcTree) => {
      if (tree.type === TreeItemType.Tree) {
        if (tree.id === id) {
          res = tree
        }
        res == null && tree.nodes.forEach(recur)
      }
    }
    recur(this)
    return res
  }

  queryTreesByWordId (wordId: WordId) {
    const res: CalcTree[] = []
    const recur = (tree: CalcTree) => {
      const hasFound = tree.wordNodes.length > 0 && tree.wordNodes.some(node => node.id === wordId)
      if (hasFound) {
        res.push(tree)
      } else {
        tree.treeNodes.forEach(recur)
      }
    }
    recur(this)
    return res
  }
}
