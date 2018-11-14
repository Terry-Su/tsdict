import React, { Component } from "react"
import mapState from "../utils/mapState"
import { isNil } from "../utils/lodash"
import IframeViewer from "./IframeViewer"
import mapStateAndStyle from "../utils/mapStateAndStyle"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

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
      const { mainData } = this.props
      const { onlineLinks } = mainData
      return onlineLinks.filter( ( { disabled } ) => ! disabled )
    }

    handleTabChange = ( event, tabIndex ) => {
      this.setState( {
        tabIndex
      } )
    }

    render() {
      const { mainData } = this.props
      const { tabIndex } = this.state
      return (
        <div>
          <Tabs
            value={ tabIndex }
             onChange={this.handleTabChange}
            scrollable
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
