import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import withLongPress from "../../../highOrder/withLongPress"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import { DictDataWord } from "../../../../../../shared/__typings__/DictData"
import { HOME_ROUTE } from "../../../../constants/routes"
import { routerRedux } from "dva/router"
const { push } = routerRedux

const DecoratedListItem: any = withLongPress( ListItem )

export default mapStateAndStyle()(
  class WordItem extends Component<{
    word: DictDataWord

    dispatch: Function
  }, any> {
    onClick = () => {
      const { word, dispatch } = this.props
      dispatch(
        push( HOME_ROUTE )
      )
      dispatch( {
        type : "app/UPDATE_SEARCHING",
        value: word.name
      } )
    }

    onLongPress = () => {
      const { dispatch, word } = this.props
      dispatch( { type: 'treePage/UPDATE_LONG_PRESSING_WORD', value: word } )
      dispatch( { type: 'treePage/SHOW_WORD_FUNCTION_DIALOG' } )
    }
    render() {
      const { word } = this.props
      return (
        <DecoratedListItem button onClick={ this.onClick } onLongPress={ this.onLongPress }>
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ word.name } />
        </DecoratedListItem>
      )
    }
  }
)