import React, { Component } from 'react'

import RenameDialog from '@/components/Dialog/RenameDialog'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle()(
  class TheTagRenameDialog extends Component<any, any> {
    render() {
      const {
        isRenameDialogOpen,
        callbackAfterRenamed,
        renamingName,
      } = selector.tagPageState
      const { dispatch } = this.props
      return (
        <RenameDialog
          open={isRenameDialogOpen}
          defaultValue={renamingName}
          onSubmit={callbackAfterRenamed}
          onClose={ () => dispatch( { type: 'tagPage/HIDE_RENAME_DIALOG' } ) }
        />
      )
    }
  }
)
