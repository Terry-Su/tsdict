import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import Input from "@material-ui/core/Input"
import Switch from "@material-ui/core/Switch"
import Button from "@material-ui/core/Button"
import { OnlineLink } from "../../__typings__"
import { notNil } from "../../utils/lodash"
import getUniqueKey from "../../utils/getUniqueId"
import TopbarLayout from "../layouts/TopbarLayout"
import { createOnlineLink } from "../../models/mainData"
import getUniqueId from "../../utils/getUniqueId"

export default mapStateAndStyle()(
  class Template extends Component<any, any> {
    addingLabelInputRef: any = React.createRef()
    addingUrlInputRef: any = React.createRef()
    addingAfterInputRef: any = React.createRef()

    constructor( props ) {
      super( props )

      // this.addingLabelInputRef = React.createRef()
      // this.addingUrlInputRef = React.createRef()
      // this.addingAfterInputRef = React.createRef()
    }

    

    onAddClick = () => {
      const label = this.addingLabelInputRef.current.value
      const url = this.addingUrlInputRef.current.value
      const after = this.addingAfterInputRef.current.value
      this.props.dispatch( { type : 'mainData/ADD_ONLINE_LINK', value: createOnlineLink( {
        id: getUniqueId(),
        label,
        url,
        after
      } ) } )

      this.addingLabelInputRef.current.value = ''
      this.addingUrlInputRef.current.value = ''
      this.addingAfterInputRef.current.value = ''
    }

    onRemoveClick = link => {
      this.props.dispatch( { type: 'mainData/REMOVE_ONLINE_LINK', value: link } )
    }

    handleSwitchChange = link => {
      this.props.dispatch( { type: 'mainData/TOGGLE_ONLINE_LINK_', value: link } )
    }

    onLabelInputChange = ( link, e ) => this.props.dispatch( { type: 'mainData/UPDATE_ONLINE_LINK', link, key: 'label', value: e.target.value } )
    onUrlInputChange = ( link, e ) => this.props.dispatch( { type: 'mainData/UPDATE_ONLINE_LINK', link, key: 'url', value: e.target.value } )
    onAfterInputChange = ( link, e ) => this.props.dispatch( { type: 'mainData/UPDATE_ONLINE_LINK', link, key: 'after', value: e.target.value } )

    render() {
      const { mainData, dispatch } = this.props
      const { onlineLinks } = mainData
      return (
        <TopbarLayout>
          <section>
            <Input placeholder="Label" inputRef={ this.addingLabelInputRef }></Input>
            <Input placeholder="Url" inputRef={ this.addingUrlInputRef }></Input>
            <Input placeholder="(Optional) After"inputRef={ this.addingAfterInputRef }></Input>
            <Button variant="contained" onClick={ this.onAddClick }>Add</Button>
          </section>

          {onlineLinks.map( ( link: OnlineLink ) => (
            <section key={ link.id }>
              <Input defaultValue={link.label} onChange={ ( e ) => this.onLabelInputChange( link, e ) }/>
              <Input defaultValue={link.url} onChange={ ( e ) => this.onUrlInputChange( link, e ) } />
              {
                notNil( link.after ) && link.after.trim() !== '' && <Input defaultValue={link.after} onChange={ ( e ) => this.onAfterInputChange( link, e ) }/>
              }
              <Switch
                checked={! link.disabled}
                onChange={() => this.handleSwitchChange( link )}
                value="checkedA"
              />
              <Button variant="contained" onClick={ () => this.onRemoveClick( link ) }>Remove</Button>
              <br /><br /><br />
            </section>
          ) )}
        </TopbarLayout>
      )
    }
  }
)
