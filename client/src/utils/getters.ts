import { TreeNode } from '@/__typings__'

import { isPlainObject, isString } from './lodash'

export function isTreeItem( treeNode: TreeNode ) {
  return isPlainObject( treeNode )
}
export function isWordItem( treeNode: TreeNode ) {
  return isString( treeNode )
}