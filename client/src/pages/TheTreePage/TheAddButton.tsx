import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

export default mapStateAndStyle( {
  entry: {
    position: "absolute",
    right   : "5%",
    bottom  : "5%"
  }
} )(
  class TheAddButton extends Component<any, any> {
    onClick = () => {
      this.props.dispatch( { type: 'treePageAddDialog/RESTORE' } )
      this.props.dispatch( { type: 'treePage/SHOW_ADD_DIALOG' } )

    }
    render() {
      const { classes: c } = this.props
      return (
        <Fab className={c.entry} color="primary" onClick={this.onClick}>
          <AddIcon />
        </Fab>
      )
    }
  }
)
