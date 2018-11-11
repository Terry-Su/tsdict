export interface DictData {
  words: DictDataWord[]
  onlineLinks: string[]
  enabledOnlineLinks: string[]
}


export interface DictDataWord {
  name: string
  comments: string[]
  pictures: DictDataWordMedia[]
  audios: DictDataWordMedia[]
  videos: DictDataWordMedia[]
} 


export interface DictDataWordMedia {
  relative: string
}