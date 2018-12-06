import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import RenameDialog from "../../Dialog/RenameDialog"
import selector from "../../../selectors"

export default mapStateAndStyle()(
  class TheTagRenameDialog extends Component<any, any> {
    render() {
      const {
        isRenameDialogOpen,
        callbackAfterRenamed,
        renamingName,
      } = selector.treePageState
      const { dispatch } = this.props
      return (
        <RenameDialog
          open={isRenameDialogOpen}
          defaultValue={renamingName}
          onSubmit={callbackAfterRenamed}
          onClose={ () => dispatch( { type: 'treePage/HIDE_RENAME_DIALOG' } ) }
        />
      )
    }
  }
)
