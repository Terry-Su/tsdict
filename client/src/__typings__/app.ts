import { TypeTag, TypeTree } from './'
import { TreeSelection } from './tree'
import { TypeWord } from './word'

export interface SyncData {
  words: TypeWord[]
  tree: TypeTree
  tags: TypeTag[]
  // # app state
  lastSelections: TreeSelection[]
}