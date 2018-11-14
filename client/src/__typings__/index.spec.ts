import { DictDataWord } from "../../../shared/__typings__/DictData"

export interface ClientData {
  cachedWords: DictDataWord[]
  onlineLinks: OnlineLink[]
}

export interface OnlineLink {
  id: string,
  label: string,
  url: string,
  disabled?: boolean
  after?: string
}