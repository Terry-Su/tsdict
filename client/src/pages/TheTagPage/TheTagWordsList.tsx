import { routerRedux } from 'dva/router'
import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import withLongPress from '@/components/highOrder/withLongPress'
import VirtualScrollingList from '@/components/VirtualScrollingList/VirtualScrollingList'
import { HOME_ROUTE } from '@/constants/routes'
import selector from '@/selectors'
import {
    filterWordsByDegreeRange, filterWordsBySelectedTagIds, sortWords
} from '@/shared/reorganizeItems'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import TagIcon from '@material-ui/icons/LocalOffer'
import { DictDataWord } from '@shared/__typings__/DictData'

const { push } = routerRedux

class Props extends DefaultProps {
  shallShowFilterSection: boolean
}

const DecoratedListItem: any = withLongPress( ListItem )
export default mapStateAndStyle()(
  class TheTagWordsList extends BasicComponent<Props> {
    get reorganizedWords(): DictDataWord[] {
      const { currentTag } = selector
      const { ids = [] } = currentTag
      const words = ids.map( id => selector.getWordByWordId( id ) ).filter( notNil )
      let res =  [ ...words ]

      // filter
      const { shallShowFilterSection } = this.props
      if ( shallShowFilterSection ) {
        const {
          startDegree,
          endDegree,
        } = selector.tagPageState
        res = filterWordsByDegreeRange( res, startDegree, endDegree )
      }

      // sort
      const {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } = selector.tagPageState
      res = sortWords( res, {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } )

      return res
    }
    onItemLongPress = ( word: DictDataWord ) => {
      const { dispatch } = this.props
      dispatch( { type: 'tagPage/UPDATE_LONG_PRESSING_WORD', value: word } )
      dispatch( { type: 'tagPage/SHOW_WORD_FUNCTION_DIALOG' } )
    }

    onWordClick = word => {
      this.props.dispatch( {
        type : "app/UPDATE_SEARCHING",
        value: word.name,
      } )
      this.props.dispatch( {
        type: "app/SHOW_CURRENT_WORD_PANEL",
      } )

      const wordIds = this.reorganizedWords.map( v => v.id )
      this.props.dispatch( { type: "app/UPDATE_ACTIVE_WORD_IDS", value: wordIds } )
    }

    render() {
      const { reorganizedWords } = this
      return (
        // <List>
        //   {reorganizedWords.map( word => (
            
        //   ) )}
        // </List>
        <VirtualScrollingList
        rowHeight={ 60 }
        items={reorganizedWords}
        render={( { style, virtualScrollingItem: word } ) => (
          <DecoratedListItem style={style} button onClick={ () => this.onWordClick( word ) } onLongPress={() => this.onItemLongPress( word ) }>
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ word.name } />
            </DecoratedListItem>
        )}
      />
      )
    }
  }
)
