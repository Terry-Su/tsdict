import React, { Component } from 'react'

import BasicComponent from '@/components/BasicComponent'
import RenameDialog from '@/components/Dialog/RenameDialog'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle()(
  class TheTagRenameDialog extends BasicComponent {
    render() {
      const {
        isRenameDialogOpen,
        callbackAfterRenamed,
        renamingName
      } = selector.treePageState
      const { dispatch } = this.props
      return (
        isRenameDialogOpen && (
          <RenameDialog
            open={isRenameDialogOpen}
            defaultValue={renamingName}
            onSubmit={callbackAfterRenamed}
            onClose={() => dispatch( { type: "treePage/HIDE_RENAME_DIALOG" } )}
          />
        )
      )
    }
  }
)
