import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import TopbarLayout from "../layouts/TopbarLayout"
import Input from "@material-ui/core/Input"
import selector from "../../selectors"
import { Tag } from "../../__typings__"

export default mapStateAndStyle()(
  class TheTagsPage extends Component<any, any> {
    onInputChange = ( tag: Tag, e: any ) => {
      this.props.dispatch( { type: 'mainData/UPDATE_TAG_NAME', tag, newName: e.target.value } )
    }

    render() {
      const { tags } = selector.mainDataState
      return (
        <TopbarLayout>
          <h2>All tags</h2>
          {
            tags.map( tag => <div key={tag.id}>
              <Input value={ tag.name } onChange={e => this.onInputChange( tag, e )}/>
            </div> )
          }
        </TopbarLayout>
      )
    }
  }
)