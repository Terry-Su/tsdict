import { routerRedux } from 'dva/router'
import React, { Component } from 'react'

import { HOME_ROUTE } from '@/constants/routes'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { DictDataWord } from '@shared/__typings__/DictData'

import { isString, notNil } from '../../utils/lodash'

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
