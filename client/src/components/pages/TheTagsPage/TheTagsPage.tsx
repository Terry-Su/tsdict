import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import TopbarLayout from "../../layouts/TopbarLayout"
import TheTopBar from "./TheTopBar"
import TheTagsList from "./TheTagsList"
import TheTagWordsList from "./TheTagWordsList"
import selector from "../../../selectors"

export default mapStateAndStyle()(
  class TheTagsPage extends Component<any, any> {
    render() {
      const { isTagsHome } = selector
      return (
        <TopbarLayout>
          <TheTopBar />
          {isTagsHome ? <TheTagsList /> : <TheTagWordsList />}
        </TopbarLayout>
      )
    }
  }
)
