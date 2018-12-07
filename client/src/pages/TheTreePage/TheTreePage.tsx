import React, { Component } from 'react'

import TopbarLayout from '@/components/layouts/TopbarLayout'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import AddIcon from '@material-ui/icons/Add'

import TheAddButton from './TheAddButton'
import TheAddDialog from './TheAddDialog'
import TheRenameDialog from './TheRenameDialog'
import TheTreeFunctionDialogue from './TheTreeFunctionDialogue'
import TheTreeTopBar from './TheTreeTopBar'
import TheTreeView from './TheTreeView/TheTreeView'
import TheWordFunctionDialogue from './TheWordFunctionDialogue'

export default mapStateAndStyle( {
  addButton: {
    position: "absolute",
    right   : "5%",
    bottom  : "5%"
  }
} )(
  class TheTreePage extends Component<any, any> {

    render() {
      return (
        <TopbarLayout>
          <TheTreeTopBar />
          <TheTreeView />
          <TheAddButton />

          <TheAddDialog />
          <TheTreeFunctionDialogue />
          <TheWordFunctionDialogue />
          <TheRenameDialog />
        </TopbarLayout>
      )
    }
  }
)
