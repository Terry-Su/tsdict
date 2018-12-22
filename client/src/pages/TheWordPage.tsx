import { Link } from 'dva/router'
import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import BasicComponent from '@/components/BasicComponent'
import FilterSection from '@/components/FilterSection'
import SubTopbarLayout from '@/components/layouts/SubTopbarLayout'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import SortSection, { SortType } from '@/components/SortSection'
import SubTopBar from '@/components/SubTopBar'
import { HOME_ROUTE } from '@/constants/routes'
import selector from '@/selectors'
import {
    filterWordsByDegreeRange, filterWordsBySelectedTagIds, sortWords
} from '@/shared/reorganizeItems'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { scrollToTop } from '@/utils/scrollToTop'
import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FilterIcon from '@material-ui/icons/FilterList'
import SortIcon from '@material-ui/icons/Sort'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

class State {
  shallShowFilterSection: boolean = false
  wordMoreAnchorEl: HTMLElement
  sortAnchorEl: HTMLElement
}

export default mapStateAndStyle( {
  listItem: {
    cursor: "pointer",
    border: "1px solid #ddd"
  },
  degree: {
    color: '#dfdfdf'
  }
} )(
  class TheWordPage extends BasicComponent {
    state = { ...new State() }

    removingWord = null

    mainRef = React.createRef()

    get reorganizedWords(): DictDataWord[] {
      const { words } = selector.coreState
      let res = [ ...words ]
      const { shallShowFilterSection } = this.state

      // filter
      if ( shallShowFilterSection ) {
        const {
          startDegree,
          endDegree,
          selectedTagIds
        } = selector.wordPageState
        res = filterWordsBySelectedTagIds( res, selectedTagIds )
        res = filterWordsByDegreeRange( res, startDegree, endDegree )
      }

      // sort
      const {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } = selector.wordPageState
      res = sortWords( res, {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } )

      return res
    }

    onWordNameClick = value => {
      this.props.dispatch( { type: "app/UPDATE_SEARCHING", value } )
      this.props.dispatch( { type: "app/SHOW_CURRENT_WORD_PANEL" } )
    }

    onMoreClick = ( event, word ) => {
      this.setState( {
        wordMoreAnchorEl: event.currentTarget
      } )
      this.removingWord = word
    }

    onRemoveClick = () => {
      this.props.dispatch( {
        type : "core/REMOVE_WORD_AND_RELATED",
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
      { isAscendingName, isAscendingDegree, isAscendingCreateTime }
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
      this.dispatch( {
        type : "wordPage/UPDATE_IS_ASCENDING_CREATE_TIME",
        value: isAscendingCreateTime
      } )
    }

    onSortButtonClick = e => {
      this.setState( {
        sortAnchorEl: e.currentTarget
      } )
    }

    onFilterButtonClick = () => {
      this.setState( ( prevState: State ) => ( {
        shallShowFilterSection: !prevState.shallShowFilterSection
      } ) )
      const main: any = this.mainRef.current
      // main.scrollTop = 0
      scrollToTop( main )
    }

    onSortSectionClose = () => {
      this.setState( {
        sortAnchorEl: null
      } )
    }

    onFilterSectionDegreeRangeChange = (
      start: DictDataWordDegree,
      end: DictDataWordDegree
    ) => {
      this.dispatch( { type: "wordPage/UPDATE_START_DEGREE", value: start } )
      this.dispatch( { type: "wordPage/UPDATE_END_DEGREE", value: end } )
    }

    onFilterSectionTagIdsChange = ( tagIds: string[] ) => {
      this.dispatch( { type: "wordPage/UPDATE_SELECTED_TAG_IDS", value: tagIds } )
    }

    render() {
      const { core, classes: c } = this.props
      const { words } = core
      const {
        wordMoreAnchorEl,
        sortAnchorEl,
        shallShowFilterSection
      } = this.state
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
          <SubTopbarLayout
            topbar={
              <SubTopBar
              center={`Words(${ reorganizedWords.length })`}
              right={
                <div>
                  <IconButton
                    color={shallShowFilterSection ? "primary" : "default"}
                    onClick={this.onFilterButtonClick}
                  >
                    <FilterIcon />
                  </IconButton>
                  <IconButton onClick={this.onSortButtonClick}>
                    <SortIcon />
                  </IconButton>
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
              }
            />
            }
            mainRef={ this.mainRef }
          >
            
            {shallShowFilterSection && (
              <FilterSection
                startDegree={startDegree}
                endDegree={endDegree}
                selectedTagIds={selectedTagIds}
                onDegreeRangeChange={this.onFilterSectionDegreeRangeChange}
                onTagIdsChange={this.onFilterSectionTagIdsChange}
              />
            )}

            <List>
              {reorganizedWords.map( word => (
                <ListItem
                  key={word.id}
                  className={c.listItem}
                  onClick={() => this.onWordNameClick( word.name )}
                >
                  {word.name}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={c.degree}>{notNil( word.degree ) ? word.degree / 2 : 0}×★</span>
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
          </SubTopbarLayout>
        </TopbarLayout>
      )
    }
  }
)
