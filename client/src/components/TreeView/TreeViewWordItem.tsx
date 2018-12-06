import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import selector from "../../selectors"
import { CalcTree } from "../../models/treePage"
import { Tree, TreeNode } from "../../__typings__"
import { isString, notNil } from "../../utils/lodash"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import FolderIcon from "@material-ui/icons/Folder"
import NotesIcon from "@material-ui/icons/Notes"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import ListItemText from "@material-ui/core/ListItemText"
import { DictDataWord } from "../../../../shared/__typings__/DictData"
import { HOME_ROUTE } from "../../constants/routes"
import { routerRedux } from "dva/router"
const { push } = routerRedux

export default mapStateAndStyle()(
  class TreeViewItem extends Component<
    {
      wordId: string

      dispatch: Function
    },
    any
  > {
    get word(): DictDataWord {
      const { wordId } = this.props
      return selector.getWordByWordId( wordId )
    }

    onClick = () => {
      this.props.dispatch(
        push( HOME_ROUTE )
      )
      this.props.dispatch( {
        type : "app/UPDATE_SEARCHING",
        value: this.word.name
      } )
    }

    render() {
      const { word } = this
      return (
        <ListItem button onClick={this.onClick}>
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={notNil( word ) ? word.name : "Not found"} />
        </ListItem>
      )
    }
  }
)
