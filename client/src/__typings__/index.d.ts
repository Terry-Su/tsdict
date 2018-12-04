import { DictDataWord } from "../../../shared/__typings__/DictData"
import { TAG_IDS } from "../constants/shared"


export type WORD_ID = string
export type Tag = {
  id: string,
  name: string,
  [ TAG_IDS ]: WORD_ID[]
}

export interface ClientData {
  words: DictDataWord[]
  onlineLinks: OnlineLink[],
  tags: Tag[]
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