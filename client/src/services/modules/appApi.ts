import { SyncData } from '@/__typings__/app'

import BaseApi from '../BaseApi'

class AppApi extends BaseApi {
  pull = ( data?: SyncData ) => this.handledPost( '/pull', data )
  push = ( data: SyncData ) => this.handledPost( '/push', data )
}

export default new AppApi()