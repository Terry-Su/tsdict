import React, { Component } from 'react'

import IframeViewer from '@/components/IframeViewer'
import mapState from '@/utils/mapState'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

export const OnlineLink = mapStateAndStyle( {
  entry: {
    width : "100%",
    height: "500px"
  }
} )(
  class OnlineLink extends Component<any, any> {
    render() {
      const { link, app, classes: c } = this.props
      const { searching } = app
      const { url, after = "" } = link
      const src = `${url}${searching}${after}`
      return (
        <div className={c.entry}>
          <IframeViewer src={src} />
        </div>
      )
    }
  }
)

export default mapState(
  class OnlineLinks extends Component<any, any> {
    constructor( props ) {
      super( props )
      this.state = {
        tabIndex: 0
      }
    }

    get enabledOnlineLinks() {
      const { core } = this.props
      const { onlineLinks } = core
      return onlineLinks.filter( ( { disabled } ) => ! disabled )
    }

    handleTabChange = ( event, tabIndex ) => {
      this.setState( {
        tabIndex
      } )
    }

    render() {
      const { core } = this.props
      const { tabIndex } = this.state
      return (
        <div>
          <Tabs
            value={ tabIndex }
             onChange={this.handleTabChange}
            // scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            
            {
              this.enabledOnlineLinks.map( ( { label }, index ) => <Tab key={index} label={ label } /> )
            }
          </Tabs>
          {
            this.enabledOnlineLinks.map( ( onlineLink, index ) => index === tabIndex && <OnlineLink key={ index } link={ onlineLink } /> )
          }
        </div>
      )
    }
  }
)
