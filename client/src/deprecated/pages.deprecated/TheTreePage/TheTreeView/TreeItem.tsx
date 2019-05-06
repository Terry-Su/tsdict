import React, { Component } from 'react'

import withLongPress from '@/components/highOrder/withLongPress'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { scrollToTop } from '@/utils/scrollToTop'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import FolderIcon from '@material-ui/icons/Folder'

const DecoratedListItem: any = withLongPress( ListItem )

export default mapStateAndStyle()(
  class TreeItem extends Component<any, any> {
    onClick = () => {
      const { mainRef } = this.props
      scrollToTop( mainRef.current )

      const { tree, dispatch } = this.props
      dispatch( { type: 'treePage/UPDATE_CURRENT_TREE_ID', value: tree.id } )
    }

    onLongPress = () => {
      const { dispatch, tree } = this.props
      dispatch( { type: 'treePage/UPDATE_LONG_PRESSING_TREE', value: tree } )
      dispatch( { type: 'treePage/SHOW_TREE_FUNCTION_DIALOG' } )
    }

    render() {
      const { tree } = this.props
      return (
        <DecoratedListItem button onClick={ this.onClick } onLongPress={ this.onLongPress }>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ tree.name } />
        </DecoratedListItem>
      )
    }
  }
)