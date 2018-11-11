import { DictDataWord } from "../../../shared/__typings__/DictData"

export interface ClientData {
  cachedWords: DictDataWord[]
  onlineLinks: OnlineLink[]
}

export interface OnlineLink {
  label: string,
  url: string,
  enabled?: boolean
  after?: string
}