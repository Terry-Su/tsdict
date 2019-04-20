import { DictDataWord } from '../../../shared/__typings__/DictData'
import { TAG_IDS } from '../constants/shared'

export type WordId = string
export type Tag = {
  id: string,
  name: string,
  [ TAG_IDS ]: WordId[]
}

export type TreeNode = WordId | Tree

// 2 Types:
// 1. Tree(like 'folder')
// 2. WordId(like 'file')
export type Tree = {
  id: string,
  name: string,
  nodes: TreeNode[]
}

export interface ClientData {
  words: DictDataWord[]
  onlineLinks: OnlineLink[],
  tags: Tag[]
  tree: Tree
}

export interface OnlineLink {
  id: string,
  label: string,
  url: string,
  disabled?: boolean
  after?: string
}


export interface Setting {
  server: string
}

