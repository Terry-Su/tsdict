import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { DictDataWord } from '@shared/__typings__/DictData'

class Props extends DefaultProps {
  onClick: Function
  wordId: string
  active: boolean
}
class State {}
class Style extends GlobalStyle {
}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class TreeItem extends BasicComponent<Props, State> {
    state = { ...new State() }
    render() {
      const { classes: c, dispatch, onClick, wordId, active } = this.props
      const word = selector.getWordByWordId( wordId )
      return (
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <InsertDriveFileIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={notNil( word ) ? word.name : "Not found"} />
          </ListItem>
        </div>
      )
    }
  }
)
