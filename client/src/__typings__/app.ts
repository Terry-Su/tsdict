import { TypeTag, TypeTree } from './'
import { TypeWord } from './word'

export interface SyncData {
  words: TypeWord[]
  tree: TypeTree
  tags: TypeTag[]
}