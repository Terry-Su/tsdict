import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import Input from "@material-ui/core/Input"
import Switch from "@material-ui/core/Switch"
import Button from "@material-ui/core/Button"
import { OnlineLink } from "../../../__typings__"
import { notNil } from "../../../utils/lodash"
import getUniqueKey from "../../../utils/getUniqueId"
import { createOnlineLink } from "../../../models/core"
import getUniqueId from "../../../utils/getUniqueId"

export default mapStateAndStyle()(
  class TheOnlineLinksSetting extends Component<any, any> {
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
      this.props.dispatch( { type : 'core/ADD_ONLINE_LINK', value: createOnlineLink( {
        id: getUniqueId(),
        label,
        url,
        after
      } ) } )

      this.addingLabelInputRef.current.value = ''
      this.addingUrlInputRef.current.value = ''
      this.addingAfterInputRef.current.value = ''
    }

    onRemoveClick = index => {
      const { dispatch, core } = this.props
      dispatch( { type: 'core/REMOVE_ONLINE_LINK', value: index } )
      setTimeout( () => {
        const { onlineLinks } = this.props.core
        dispatch( { type: "core/UPDATE_ONLINE_LINKS", value: [] } )
        dispatch( { type: "core/UPDATE_ONLINE_LINKS", value: onlineLinks } )
      }, 0 )
    }

    handleSwitchChange = index => {
      this.props.dispatch( { type: 'core/TOGGLE_ONLINE_LINK', value: index } )
    }

    onLabelInputChange = ( index, e ) => this.props.dispatch( { type: 'core/UPDATE_ONLINE_LINK', index, key: 'label', value: e.target.value } )
    onUrlInputChange = ( index, e ) => this.props.dispatch( { type: 'core/UPDATE_ONLINE_LINK', index, key: 'url', value: e.target.value } )
    onAfterInputChange = ( index, e ) => this.props.dispatch( { type: 'core/UPDATE_ONLINE_LINK', index, key: 'after', value: e.target.value } )

    render() {
      const { core, dispatch } = this.props
      const { onlineLinks } = core
      return (
        <div>
          <h2>Online Links</h2>
          <section>
            <Input placeholder="Label" inputRef={ this.addingLabelInputRef }></Input>
            <Input placeholder="Url" inputRef={ this.addingUrlInputRef }></Input>
            <Input placeholder="(Optional) After"inputRef={ this.addingAfterInputRef }></Input>
            <Button variant="contained" onClick={ this.onAddClick }>Add</Button>
          </section>

          {onlineLinks.map( ( link: OnlineLink, index: number ) => (
            <section key={ index }>
              <Input defaultValue={link.label} onChange={ ( e ) => this.onLabelInputChange( index, e ) }/>
              <Input defaultValue={link.url} onChange={ ( e ) => this.onUrlInputChange( index, e ) } />
              {
                notNil( link.after ) && link.after.trim() !== '' && <Input defaultValue={link.after} onChange={ ( e ) => this.onAfterInputChange( index, e ) }/>
              }
              <Switch
                checked={! link.disabled}
                onChange={() => this.handleSwitchChange( index )}
                value="checkedA"
              />
              <Button variant="contained" onClick={ () => this.onRemoveClick( index ) }>Delete</Button>
              <br /><br /><br />
            </section>
          ) )}
        </div>
      )
    }
  }
)
