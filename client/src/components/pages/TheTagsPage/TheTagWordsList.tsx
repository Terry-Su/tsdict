import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import List from "@material-ui/core/List"
import withLongPress from "../../highOrder/withLongPress"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import TagIcon from "@material-ui/icons/LocalOffer"
import ListItemText from "@material-ui/core/ListItemText"
import selector from "../../../selectors"
import { Tag } from "../../../__typings__"
import { DictDataWord } from "../../../../../shared/__typings__/DictData"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"

const DecoratedListItem: any = withLongPress( ListItem )
export default mapStateAndStyle()(
  class TheTagWordsList extends Component<any, any> {
    onItemLongPress = ( word: DictDataWord ) => {
      console.log( word )
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
