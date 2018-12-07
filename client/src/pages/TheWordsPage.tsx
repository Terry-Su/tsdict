import { Link } from 'dva/router'
import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import BasicComponent from '@/components/BasicComponent'
import FilterSection from '@/components/FilterSection'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import SortSection, { SortType } from '@/components/SortSection'
import { HOME_ROUTE } from '@/constants/routes'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

class State {
  wordMoreAnchorEl: HTMLElement
  sortAnchorEl: HTMLElement
}

export default mapStateAndStyle( {
  listItem: {
    cursor: "pointer",
    border: "1px solid #ddd"
  }
} )(
  class TheWordsPage extends BasicComponent {
    state = new State()

    removingWord = null

    get reorganizedWords(): DictDataWord[] {
      const { words } = selector.coreState
      let res = [ ...words ]
      
      // filter
      const {
        startDegree,
        endDegree,
        selectedTagIds
      } = selector.wordPageState
      res = res.filter( word => {
        // tags
        const tags = selector.getWordTags( word.id )
        const tagIds = tags.map( tag => tag.id )
        return selectedTagIds.length === 0 || selectedTagIds.some( selectedTagId => tagIds.includes( selectedTagId ) )
      } )
      .filter( word => {
        const { degree } = word
        // degree
        if ( startDegree <= endDegree )  {
          return degree >= startDegree && degree <= endDegree
        }        
      } )

      // sort
      const {
        sortType,
        isAscendingName,
        isAscendingDegree
      } = selector.wordPageState
      res.sort( ( a, b ) => {
        // main sort
        switch ( sortType ) {
          case SortType.Name:
            if ( a.name > b.name ) {
              return isAscendingName ? 1 : -1
            }
            if ( a.name < b.name ) {
              return isAscendingName ? -1 : 1
            }
            break
          case SortType.Degree:
            if ( a.degree > b.degree ) {
              return isAscendingDegree ? 1 : -1
            }
            if ( a.degree < b.degree ) {
              return isAscendingDegree ? -1 : 1
            }
            break
        }

        // second sort
        // a.key === b.key
        // compare the others
        if ( a.name > b.name ) {
          return isAscendingName ? 1 : -1
        }
        if ( a.name < b.name ) {
          return isAscendingName ? -1 : 1
        }
        if ( a.degree > b.degree ) {
          return isAscendingDegree ? 1 : -1
        }
        if ( a.degree < b.degree ) {
          return isAscendingDegree ? -1 : 1
        }
        return 0
      } )

      return res
    }

    onWordNameClick = value => {
      this.props.dispatch( { type: "app/UPDATE_SEARCHING", value } )
    }

    onMoreClick = ( event, word ) => {
      this.setState( {
        wordMoreAnchorEl: event.currentTarget
      } )
      this.removingWord = word
    }

    onRemoveClick = () => {
      this.props.dispatch( {
        type : "core/REMOVE_WORD",
        value: this.removingWord
      } )
      this.removingWord = null
      this.closeMenu()
    }

    closeMenu = () => {
      this.setState( {
        wordMoreAnchorEl: null
      } )
    }

    onSortSectionChange = (
      sortType,
      { isAscendingName, isAscendingDegree }
    ) => {
      this.dispatch( { type: "wordPage/UPDATE_SORT_TYPE", value: sortType } )
      this.dispatch( {
        type : "wordPage/UPDATE_IS_ASCENDING_NAME",
        value: isAscendingName
      } )
      this.dispatch( {
        type : "wordPage/UPDATE_IS_ASCENDING_DEGREE",
        value: isAscendingDegree
      } )
    }

    onSortButtonClick = e => {
      this.setState( {
        sortAnchorEl: e.currentTarget
      } )
    }

    onSortSectionClose = () => {
      this.setState( {
        sortAnchorEl: null
      } )
    }

    onFilterSectionDegreeRangeChange = ( start: DictDataWordDegree, end: DictDataWordDegree ) => {
      this.dispatch( { type: 'wordPage/UPDATE_START_DEGREE', value: start } )
      this.dispatch( { type: 'wordPage/UPDATE_END_DEGREE', value: end } )
    }

    onFilterSectionTagIdsChange = ( tagIds: string[] ) => {
      this.dispatch( { type: 'wordPage/UPDATE_SELECTED_TAG_IDS', value: tagIds } )
    }

    render() {
      const { core, classes: c } = this.props
      const { words } = core
      const { wordMoreAnchorEl, sortAnchorEl } = this.state
      const {
        sortType,
        isAscendingName,
        isAscendingDegree,

        startDegree,
        endDegree,
        selectedTagIds
      } = selector.wordPageState
      const { reorganizedWords } = this

      return (
        <TopbarLayout>
          <div>
            <FilterSection 
              startDegree={startDegree}
              endDegree={endDegree}
              selectedTagIds={selectedTagIds}

              onDegreeRangeChange={ this.onFilterSectionDegreeRangeChange }
              onTagIdsChange={ this.onFilterSectionTagIdsChange }
            />
            <Button variant="contained" onClick={this.onSortButtonClick}>
              Sort
            </Button>
            <SortSection
              anchorEl={sortAnchorEl}
              open={Boolean( sortAnchorEl )}
              onClose={this.onSortSectionClose}
              sortType={sortType}
              isAscendingName={isAscendingName}
              isAscendingDegree={isAscendingDegree}
              onChange={this.onSortSectionChange}
            />
          </div>

          <List>
            {reorganizedWords.map( word => (
              <ListItem
                key={word.id}
                className={c.listItem}
                onClick={() => this.onWordNameClick( word.name )}
              >
                <Link to={HOME_ROUTE}>{word.name}</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  onClick={event => this.onMoreClick( event, word )}
                >
                  ...
                </Button>
              </ListItem>
            ) )}
          </List>
          <Menu
            anchorEl={wordMoreAnchorEl}
            open={Boolean( wordMoreAnchorEl )}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={() => this.onRemoveClick()}>Delete</MenuItem>
          </Menu>
        </TopbarLayout>
      )
    }
  }
)
