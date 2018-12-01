import { NoteData } from "../../client/src/components/Note/Note";

export interface DictData {
  words: DictDataWord[]
  onlineLinks: string[]
  enabledOnlineLinks: string[]
}


export interface DictDataWord {
  id: string,
  name: string,
  note: NoteData
} 


export interface DictDataWordMedia {
  relative: string
}