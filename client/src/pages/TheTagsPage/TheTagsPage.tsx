import React, { Component } from 'react'

import TopbarLayout from '@/components/layouts/TopbarLayout'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

import TheRenameDialog from './TheRenameDialog'
import TheTagFunctionDialogue from './TheTagFunctionDialogue'
import TheTagsList from './TheTagsList'
import TheTagWordsList from './TheTagWordsList'
import TheTopBar from './TheTopBar'
import TheWordFunctionDialogue from './TheWordFunctionDialogue'

export default mapStateAndStyle()(
  class TheTagsPage extends Component<any, any> {
    render() {
      const { isTagsHome } = selector
      return (
        <TopbarLayout>
          <TheTopBar />
          {isTagsHome ? <TheTagsList /> : <TheTagWordsList />}
          <TheTagFunctionDialogue />
          <TheWordFunctionDialogue />
          <TheRenameDialog />
        </TopbarLayout>
      )
    }
  }
)
