import axios from 'axios'

import { modelsStateMap } from '@/utils/redux'

const isAbsoluteUrl = url => {
  try {
    new URL( url )
    return true
  } catch ( e ) { return false } 
}

export default class BaseApi {
  get origin(): string {
    return modelsStateMap[ 'setting' ][ 'origin' ] || location.origin
  }

  getTargetUrl( url ): string {
    const targetUrl = isAbsoluteUrl( url ) ? url : `${this.origin}${url}`
    return targetUrl
  }

  get( url, setting?: any ) {
    const targetUrl = this.getTargetUrl( url )
    return axios.get( targetUrl, { ...setting } )
  }

  handledGet( url, setting?: any ) {
    const targetUrl = this.getTargetUrl( url )
    return this.get( targetUrl, setting ).then( response => response.data ).catch( e => {
      throw( e )
    } )
  }

  post( url, data, setting?: any ) {
    const targetUrl = this.getTargetUrl( url )
    return axios.post( targetUrl, data, { ...setting } )
  }

  
  handledPost = ( url, data, setting?: any ) => {
    const targetUrl = this.getTargetUrl( url )
    return this.post( targetUrl, data, setting ).then( response => response.data ).catch( e => {
      throw( e )
    } )
  }
}