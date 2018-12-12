import React, { Component } from 'react'

import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import { getValueNotUndefined } from '@/utils/js'
import { isUndefined } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Menu, MenuItem } from '@material-ui/core'

export enum SortType {
  Name = "name",
  Degree = "degree"
}

class Style extends GlobalStyle {}
class State {
  sortType: SortType = SortType.Name
  isAscendingName: boolean = true
  isAscendingDegree: boolean = true
}
class Props extends DefaultProps {
  open: boolean = false
  anchorEl: HTMLElement
  onClose: any

  sortType: SortType
  isAscendingName: boolean
  isAscendingDegree: boolean

  onChange = (
    sortType: SortType,
    info: { isAscendingName: boolean; isAscendingDegree: boolean }
  ) => {}
}

function getIcon( isAscending: boolean, shallShow: boolean ) {
  return shallShow ? (
    isAscending ? (
      "⬆"
    ) : (
      "⬇"
    )
  ) : (
    <span style={{ color: "#dfdfdf" }}>{isAscending ? "⬆" : "⬇"}</span>
  )
}

export default mapStateAndStyle<Props>( { ... new Style() } )(
  class SortSection extends BasicComponent<Props, State> {
    state = { ...new State() }

    onSortByNameClick = () => {
      this.setState( prevState => {
        return {
          sortType       : SortType.Name,
          isAscendingName:
            prevState.sortType === SortType.Name ?
              !prevState.isAscendingName :
              prevState.isAscendingName
        }
      }, this.triggerOnChange )
    }

    onSortByDegreeClick = () => {
      this.setState( prevState => {
        return {
          sortType         : SortType.Degree,
          isAscendingDegree:
            prevState.sortType === SortType.Degree ?
              !prevState.isAscendingDegree :
              prevState.isAscendingDegree
        }
      }, this.triggerOnChange )
    }

    triggerOnChange = () => {
      const { onChange } = this.props
      const { sortType, isAscendingName, isAscendingDegree } = this.state
      onChange &&
        onChange( sortType, {
          isAscendingName,
          isAscendingDegree
        } )
    }

    render() {
      const {
        classes: c,
        dispatch,
        open = false,
        anchorEl,
        onClose = () => {}
      } = this.props
      const { state, props } = this
      const sortType = getValueNotUndefined( props.sortType, state.sortType )
      const isAscendingName = getValueNotUndefined(
        props.isAscendingName,
        state.isAscendingName
      )
      const isAscendingDegree = getValueNotUndefined(
        props.isAscendingDegree,
        state.isAscendingDegree
      )
      return (
        <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
          <MenuItem onClick={this.onSortByNameClick}>
            Sort by Name &nbsp;
            {getIcon( isAscendingName, sortType === SortType.Name )}
          </MenuItem>
          <MenuItem onClick={this.onSortByDegreeClick}>
            Sort by Degree &nbsp;
            {getIcon( isAscendingDegree, sortType === SortType.Degree )}
          </MenuItem>
        </Menu>
      )
    }
  }
)
