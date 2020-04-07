import { TypeId } from './'

export enum TreeItemType {
  Tree = 0,
  Word = 1
}
export interface TypeTreeItem {
  type: TreeItemType
  id: TypeId
}
export type TreeColumn = TypeTreeItem[]
export type TypeTreeColumn = TreeColumn

export type TreeSelection = TypeTreeItem

export enum SORT_TYPES {
  CREATE_TIME = 0,
  LEVEL = 1,
  LETTER = 2,
}
