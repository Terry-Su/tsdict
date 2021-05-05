import { SyncData } from '@/__typings__/app'
import { TypeWord } from '@/__typings__/word'

import BaseApi from '../BaseApi'

export interface PasteImageRequest {
  word: TypeWord
  base64Url: string
}

export type UploadFigRequest = FormData

class AppApi extends BaseApi {
  testConnection = () => this.handledGet('/test-connection')
  pull = (data?: SyncData) => this.handledPost('/pull', data)
  push = (data: SyncData) => this.handledPost('/push', data)
  pasteImage = (data: PasteImageRequest) => this.handledPost('/pasteImage', data)
  uploadGif = (data: UploadFigRequest) => this.handledPost('/uploadGif', data, { headers: { 'content-type': 'multipart/form-data' } })
}

export default new AppApi()
