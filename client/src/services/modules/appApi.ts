import BaseApi from '../BaseApi'

class AppApi extends BaseApi {
  pull = () => this.handledPost( '/pull', null )
}

export default new AppApi()