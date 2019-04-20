import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import BasicComponent from '@/components/BasicComponent'
import FilterSection from '@/components/FilterSection'
import SubTopbarLayout from '@/components/layouts/SubTopbarLayout'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import SortSection from '@/components/SortSection'
import SubTopBar from '@/components/SubTopBar'
import selector from '@/selectors'
import {
    filterWordsByDegreeRange, filterWordsBySelectedTagIds, sortBySize, sortWords
} from '@/shared/reorganizeItems'
import events, { EventTypes } from '@/utils/event'
import { isPlainObject, isString, notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { scrollToTop } from '@/utils/scrollToTop'
import { IconButton } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import AddIcon from '@material-ui/icons/Add'
import FilterIcon from '@material-ui/icons/FilterList'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import SortIcon from '@material-ui/icons/Sort'
import { DictDataWordDegree } from '@shared/__typings__/DictData'

import TheAddButton from './TheAddButton'
import TheAddDialog from './TheAddDialog/TheAddDialog'
import TheRenameDialog from './TheRenameDialog'
import TheSelectTreeDialog from './TheSelectTreeDialog'
import TheTreeFunctionDialogue from './TheTreeFunctionDialogue'
import TheTreeView from './TheTreeView/TheTreeView'
import TheWordFunctionDialogue from './TheWordFunctionDialogue'

class State {
  shallShowFilterSection: boolean = false
  sortAnchorEl
}



export default mapStateAndStyle( {
  addButton: {
    position: "absolute",
    right   : "5%",
    bottom  : "5%",
  },
} )(
  class TheTreePage extends BasicComponent {
    state = { ...new State() }

    mainRef = React.createRef()

    get shallShowBackButton(): boolean {
      return notNil( selector.currentTreeIdAbove )
    }

    get reorganizedNodes(): TreeNode[] {
      const { shallShowFilterSection } = this.state
      const { nodes } = selector.currentTree
      let res = [ ...nodes ]
      let resTrees = res.filter( node => isPlainObject( node ) ) as Tree[]
      let resWordIds = res.filter( node => isString( node ) ) as string[]
      let resWords = resWordIds.map( id => selector.getWordByWordId( id ) )

      // filter
      if ( shallShowFilterSection ) {
        const {
          startDegree,
          endDegree,
          selectedTagIds,
        } = selector.treePageState
        resWords = filterWordsBySelectedTagIds( resWords, selectedTagIds )
        resWords = filterWordsByDegreeRange( resWords, startDegree, endDegree )
      }

      const {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } = selector.treePageState
      // sort-trees
      resTrees = resTrees.sort( ( a, b ) => sortBySize( a.name, b.name, isAscendingName ) )

      // sort-words
      
      resWords = sortWords( resWords, {
        sortType,
        isAscendingName,
        isAscendingDegree,
        isAscendingCreateTime,
      } )

      resWordIds = resWords.map( word => word.id )
      res = [
        ...resTrees,
        ...resWordIds,
      ]
      return res
    }


    componentDidMount() {
      events.addHandler( EventTypes.keyDown, this.handleKeyDown )
    }
  
    componentWillUnmount() {
      events.removeHandler( EventTypes.keyDown, this.handleKeyDown )
      this.props.dispatch( { type: 'treePage/UPDATE_CURRENT_TREE_ID', value: null } )

    }

    handleKeyDown = e => {
      if ( e.key === "Backspace" ) {
        this.onBackClick()
      }
    }

    onBackClick = () => {
      this.props.dispatch( { type: "treePage/UPDATE_CURRENT_ID_TO_UPPER_ID" } )
      scrollToTop( this.mainRef.current )
    }

    onFilterButtonClick = () => {
      this.setState( ( prevState: State ) => ( {
        shallShowFilterSection: !prevState.shallShowFilterSection,
      } ) )
      const main: any = this.mainRef.current
      // main.scrollTop = 0
      scrollToTop( main )
    }

    onFilterSectionDegreeRangeChange = (
      start: DictDataWordDegree,
      end: DictDataWordDegree
    ) => {
      this.dispatch( { type: "treePage/UPDATE_START_DEGREE", value: start } )
      this.dispatch( { type: "treePage/UPDATE_END_DEGREE", value: end } )
    }

    onFilterSectionTagIdsChange = ( tagIds: string[] ) => {
      this.dispatch( { type: "treePage/UPDATE_SELECTED_TAG_IDS", value: tagIds } )
    }

    onSortButtonClick = e => {
      this.setState( {
        sortAnchorEl: e.currentTarget,
      } )
    }

    onSortSectionClose = () => {
      this.setState( {
        sortAnchorEl: null,
      } )
    }

    onSortSectionChange = (
      sortType,
      { isAscendingName, isAscendingDegree, isAscendingCreateTime }
    ) => {
      this.dispatch( { type: "treePage/UPDATE_SORT_TYPE", value: sortType } )
      this.dispatch( {
        type : "treePage/UPDATE_IS_ASCENDING_NAME",
        value: isAscendingName,
      } )
      this.dispatch( {
        type : "treePage/UPDATE_IS_ASCENDING_DEGREE",
        value: isAscendingDegree,
      } )
      this.dispatch( {
        type : "treePage/UPDATE_IS_ASCENDING_CREATE_TIME",
        value: isAscendingCreateTime,
      } )
    }

    render() {
      const { classes: c } = this.props
      const { shallShowBackButton } = this
      const { shallShowFilterSection, sortAnchorEl } = this.state

      const {
        sortType,
        isAscendingName,
        isAscendingDegree,

        startDegree,
        endDegree,
        selectedTagIds,
        isAddDialogOpen,
      } = selector.treePageState

      const { mainRef, reorganizedNodes } = this

      const { name } = selector.currentTree

      return (
        <TopbarLayout>
          <SubTopbarLayout
            topbar={
              <SubTopBar
                left={
                  shallShowBackButton && (
                    <KeyboardBackspace onClick={this.onBackClick} />
                  )
                }
                center={`${shallShowBackButton ? name : "Tree"}(${reorganizedNodes.length})`}
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
            mainRef={mainRef}
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

            <TheTreeView
              mainRef={mainRef}
              reorganizedNodes={reorganizedNodes}
            />
            <TheAddButton />

            <TheAddDialog />

            <TheTreeFunctionDialogue />
            <TheWordFunctionDialogue />
            <TheRenameDialog />
            <TheSelectTreeDialog />
          </SubTopbarLayout>
        </TopbarLayout>
      )
    }
  }
)
