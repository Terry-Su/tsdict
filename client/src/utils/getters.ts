import { TreeNode } from '@/__typings__'

import { isNumber, isPlainObject } from './lodash'

export function isTreeItem( treeNode: TreeNode ) {
  return isPlainObject( treeNode )
}
export function isWordItem( treeNode: TreeNode ) {
  return isNumber( treeNode )
}