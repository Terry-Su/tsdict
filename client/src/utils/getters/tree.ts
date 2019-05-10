import { TreeNode, TypeId, TypeTree } from '@/__typings__'
import { TreeItemType } from '@/__typings__/tree'

export const isTreeNodeTree = ( tree: TreeNode ) => typeof tree === 'object'
export const isTreeNodeWord = ( tree: TreeNode ) => ! isTreeNodeTree( tree )

export class CalcTree {
  type: TreeItemType
  id: TypeId
  name?: string
  parent: CalcTree
  nodes: CalcTree[] = []

  constructor( tree: TreeNode, parent?:CalcTree ) {
    this.parent = parent
    if ( isTreeNodeTree( tree ) ) {
      this.type = TreeItemType.Tree
      this.id = ( tree as TypeTree ).id
      this.name = ( tree as TypeTree ).name
      this.nodes = ( tree as TypeTree ).nodes.map( node => new CalcTree( node, this ) )
    } else {
      this.type = TreeItemType.Word
      this.id = tree as TypeId
    }
  }

  get selections() {
    let res = [ {
      id  : this.id,
      type: this.type,
    } ]
    let tree: CalcTree = this
    while ( tree.parent != null ) {
      const { id, type } = tree.parent
      const notRoot = tree.parent.parent != null
      notRoot && res.unshift( {
        id,
        type, 
      } )
      tree = tree.parent
    }
    return res
  }

  getCalcTreeByTreeId( id: TypeId ): CalcTree {
    let res = null
    const recur = ( tree: CalcTree ) => {
      if ( tree.type === TreeItemType.Tree ) {
         if ( tree.id === id ) {
            res = tree
         }
         res == null && tree.nodes.forEach( recur )
      }
    }
    recur( this )
    return res
  }
}