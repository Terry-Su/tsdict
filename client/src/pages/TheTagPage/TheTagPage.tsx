import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import FilterSection from '@/components/FilterSection'
import SubTopbarLayout from '@/components/layouts/SubTopbarLayout'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import SortSection from '@/components/SortSection'
import SubTopBar from '@/components/SubTopBar'
import selector from '@/selectors'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { scrollToTop } from '@/utils/scrollToTop'
import { IconButton } from '@material-ui/core'
import FilterIcon from '@material-ui/icons/FilterList'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import SortIcon from '@material-ui/icons/Sort'
import { DictDataWordDegree } from '@shared/__typings__/DictData'

import TheRenameDialog from './TheRenameDialog'
import TheTagFunctionDialogue from './TheTagFunctionDialogue'
import TheTagsList from './TheTagsList'
import TheTagWordsList from './TheTagWordsList'
import TheWordFunctionDialogue from './TheWordFunctionDialogue'

class State {
  shallShowFilterSection: boolean = false
  sortAnchorEl
}

export default mapStateAndStyle()(
  class TheTagPage extends BasicComponent<DefaultProps, State> {
    state = new State()

    mainRef= React.createRef()

    onBackClick = () => {
      this.props.dispatch( {
        type : "tagPage/UPDATE_CURRENT_TAG_ID",
        value: null
      } )
      scrollToTop( this.mainRef.current )
    }

    onFilterButtonClick = () => {
      this.setState( ( prevState: State ) => ( {
        shallShowFilterSection: !prevState.shallShowFilterSection
      } ) )
      const main: any = this.mainRef.current
      // main.scrollTop = 0
      scrollToTop( main )
    }
    
    onFilterSectionDegreeRangeChange = (
      start: DictDataWordDegree,
      end: DictDataWordDegree
    ) => {
      this.dispatch( { type: "tagPage/UPDATE_START_DEGREE", value: start } )
      this.dispatch( { type: "tagPage/UPDATE_END_DEGREE", value: end } )
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

    onSortSectionChange = (
      sortType,
      { isAscendingName, isAscendingDegree }
    ) => {
      this.dispatch( { type: "tagPage/UPDATE_SORT_TYPE", value: sortType } )
      this.dispatch( {
        type : "tagPage/UPDATE_IS_ASCENDING_NAME",
        value: isAscendingName
      } )
      this.dispatch( {
        type : "tagPage/UPDATE_IS_ASCENDING_DEGREE",
        value: isAscendingDegree
      } )
    }

    render() {
      const { isTagsHome, currentTag } = selector

      const { shallShowFilterSection, sortAnchorEl } = this.state

      const {
        sortType,
        isAscendingName,
        isAscendingDegree,

        startDegree,
        endDegree,
      } = selector.tagPageState

      const { mainRef } = this
      return (
        <TopbarLayout>
          <SubTopbarLayout
            topbar={
              <SubTopBar
                left={
                  !isTagsHome && (
                    <KeyboardBackspace onClick={this.onBackClick} />
                  )
                }
                center={isTagsHome ? "Tags" : currentTag.name}
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
                onDegreeRangeChange={this.onFilterSectionDegreeRangeChange}
                enableTag={false}
              />
            )}
            {isTagsHome ? <TheTagsList shallShowFilterSection={shallShowFilterSection} mainRef={mainRef} /> : <TheTagWordsList />}
            <TheTagFunctionDialogue />
            <TheWordFunctionDialogue />
            <TheRenameDialog />
          </SubTopbarLayout>
        </TopbarLayout>
      )
    }
  }
)
