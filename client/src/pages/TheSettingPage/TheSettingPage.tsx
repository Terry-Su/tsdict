import React, { Component } from 'react'

import Input from '@/components/Input/Input'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import TheOnlineLinksSetting from './TheOnlineLinksSetting'

export default mapStateAndStyle()(
  class TheSetting extends Component<any, any> {
    render() {
      const { server } = selector.settingState
      const { isSameHostName, port } = selector.settingState
      const { dispatch } = this.props
      return (
        <TopbarLayout>
          <h2>Server</h2>
          <FormControlLabel
            control={
              <Switch
                checked={isSameHostName}
                onChange={() =>
                  dispatch( { type: "setting/TOOGLE_SAME_HOST_NAME" } )
                }
              />
            }
            label="Same Host Name"
          />
          <br />
          {isSameHostName && (
            <div>
              <span>Port:</span>
              &nbsp;&nbsp;
              <Input
                placeholder="Port number"
                value={port}
                onChange={e =>
                  dispatch( {
                    type : "setting/UPDATE_PORT",
                    value: e.target.value
                  } )
                }
                enableClear
                onClearMouseDown={() => dispatch( {
                  type : "setting/UPDATE_PORT",
                  value: ''
                } )}
              />
            </div>
          )}
          {!isSameHostName && (
            <div>
              <span>Url:</span>
              &nbsp;&nbsp;
              <Input
                placeholder="Server Url"
                value={server}
                onChange={e =>
                  dispatch( {
                    type : "setting/UPDATE_SERVER",
                    value: e.target.value
                  } )
                }
                enableClear
                onClearMouseDown={() => dispatch( {
                  type : "setting/UPDATE_SERVER",
                  value: ''
                } )}
              />
            </div>
          )}

          <TheOnlineLinksSetting />
        </TopbarLayout>
      )
    }
  }
)
