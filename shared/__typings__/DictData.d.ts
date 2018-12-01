export interface DictData {
  words: DictDataWord[]
  onlineLinks: string[]
  enabledOnlineLinks: string[]
}


export interface DictDataWord {
  id: string,
  name: string,
  note: string
} 


export interface DictDataWordMedia {
  relative: string
}