import React, { Component } from 'react'

import withLongPress from '@/components/highOrder/withLongPress'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import TagIcon from '@material-ui/icons/LocalOffer'
import { DictDataWord } from '@shared/__typings__/DictData'

const DecoratedListItem: any = withLongPress( ListItem )
export default mapStateAndStyle()(
  class TheTagWordsList extends Component<any, any> {
    onItemLongPress = ( word: DictDataWord ) => {
      const { dispatch } = this.props
      dispatch( { type: 'tagPage/UPDATE_LONG_PRESSING_WORD', value: word } )
      dispatch( { type: 'tagPage/SHOW_WORD_FUNCTION_DIALOG' } )
    }

    render() {
      const { currentTag } = selector
      const { ids = [] } = currentTag
      const words = ids.map( id => selector.getWordByWordId( id ) )
      return (
        <List>
          {words.map( word => (
            <DecoratedListItem key={word.id} button onLongPress={() => this.onItemLongPress( word ) }>
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ word.name } />
            </DecoratedListItem>
          ) )}
        </List>
      )
    }
  }
)
