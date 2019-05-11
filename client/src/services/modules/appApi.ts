import { SyncData } from '@/__typings__/app'
import { TypeWord } from '@/__typings__/word'

import BaseApi from '../BaseApi'

export interface PasteImageRequest {
  word: TypeWord
  base64Url: string
}

class AppApi extends BaseApi {
  pull = ( data?: SyncData ) => this.handledPost( '/pull', data )
  push = ( data: SyncData ) => this.handledPost( '/push', data )
  pasteImage = ( data: PasteImageRequest ) => this.handledPost( '/pasteImage', data )
}

export default new AppApi()