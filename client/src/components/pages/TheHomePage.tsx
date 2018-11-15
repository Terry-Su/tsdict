import React, { Component } from "react"
import mapState from "../../utils/mapState"
import OnlineLinks from "../OnlineLinks"
import Input from '@material-ui/core/Input'
import TopBar from "../TopBar"
import TopbarLayout from "../layouts/TopbarLayout"


export default mapState(
  class TheHomePage extends Component<any, any> {
    onSearchChange = e => {
      const { value: searching } = e.target
      const { dispatch } = this.props

      dispatch( { type: 'app/UPDATE_SEARCHING', searching } )
    }

    onSearchKeyDown = ( e ) => {
      
    }

    search() {
      
    }

    render() {
      const { app } = this.props
      const { searching } = app
      return (
        <TopbarLayout>
          <section>
            <Input type="text" onChange={ this.onSearchChange } onKeyDown={ this.onSearchKeyDown } value={ searching } />
            &nbsp;&nbsp;
          </section>

          <br />

          <section>
            {
              searching.trim() !== '' && <OnlineLinks />
            }
          </section>
          
        </TopbarLayout>
      )
    }
  }
)
