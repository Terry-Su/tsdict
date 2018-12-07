import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import withLongPress from '@/components/highOrder/withLongPress'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import TagIcon from '@material-ui/icons/LocalOffer'

const DecoratedListItem: any = withLongPress( ListItem )
export default mapStateAndStyle()(
  class TheList extends Component<any, any> {
    onItemLongPress = ( tag: Tag ) => {
      const { dispatch } = this.props
      dispatch( { type: 'tagPage/UPDATE_LONG_PRESSING_TAG', value: tag } )
      dispatch( { type: 'tagPage/SHOW_TAG_FUNCTION_DIALOG', value: tag } )
    }

    onItemClick = ( tag: Tag ) => {
      this.props.dispatch( { type: 'tagPage/UPDATE_CURRENT_TAG_ID', value: tag.id } )
    }

    render() {
      const { tags } = selector.coreState
      return (
        <List>
          {tags.map( tag => (
            <DecoratedListItem key={tag.id} button onLongPress={() => this.onItemLongPress( tag ) } onClick={ () => this.onItemClick( tag ) }>
              <ListItemAvatar>
                <Avatar>
                  <TagIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ tag.name } />
            </DecoratedListItem>
          ) )}
        </List>
      )
    }
  }
)
