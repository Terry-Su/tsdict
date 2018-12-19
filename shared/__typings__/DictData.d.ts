import { NoteData } from '../../client/src/components/Note/Note'

export type DictDataWordDegree = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type Time = number

export interface DictDataWord {
  id: string,
  name: string,
  note: NoteData,

  createTime?: number,

  degree?: DictDataWordDegree
  
  // pronunciation
  p?: string[]
} 
