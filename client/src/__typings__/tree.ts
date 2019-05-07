import { TypeId } from './'

export enum TreeItemType {
  Tree,
  Word
}
export interface TypeTreeItem {
  type: TreeItemType
  id: TypeId
}
export type TreeColumn = TypeTreeItem[]
export type TypeTreeColumn = TreeColumn

export type TreeSelection = TypeTreeItem