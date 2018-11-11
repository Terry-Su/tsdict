import React, { Component } from "react"
import mapState from "../utils/mapState"
import { isNil } from "../utils/lodash"


export const OnlineLink = mapState(
  class OnlineLink extends Component<any, any> {
    render() {
      const { link, app } = this.props
      const { searching } = app
      const { url, after = '' } = link
      const src = `${url}${searching}${after}`
      return (
        <div>
          { link.label }
          <iframe src={ src } frameBorder="0"></iframe>
        </div>
      )
    }
  }
)


export default mapState(
  class OnlineLinks extends Component<any, any> {
    render() {
      const { mainData } = this.props
      const { onlineLinks } = mainData
      return (
        <div>
          { 
            onlineLinks.filter( ( { enabled } ) => isNil( enabled ) || enabled ).map( ( onlineLink, index ) => <OnlineLink key={ index } link={ onlineLink } /> )
            
          }
        </div>
      )
    }
  }
)
