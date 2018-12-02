import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import TheOnlineLinksSetting from "./TheOnlineLinksSetting"
import TopbarLayout from "../../layouts/TopbarLayout"
import selector from "../../../selectors"
import Input from "@material-ui/core/Input"


export default mapStateAndStyle()(
  class TheSetting extends Component<any, any> {
    onServerUrlClick = e => {
      this.props.dispatch( { type: 'setting/UPDATE_SERVER', value: e.target.value } )
    }
    render() {
      const { server } = selector.settingState
      return (
        <TopbarLayout>
          <h2>Server</h2>
          <Input placeholder="Server Url" value={ server } onChange={ this.onServerUrlClick }/>

          <TheOnlineLinksSetting />
        </TopbarLayout>
      )
    }
  }
)