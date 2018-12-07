import React, { Component } from 'react'

import { Tag } from '@/__typings__'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import { getValueNotUndefined } from '@/utils/js'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Chip, MenuItem, Paper, Select } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import { DictDataWordDegree } from '@shared/__typings__/DictData'

import BasicComponent, { DefaultProps } from './BasicComponent'
import Degree from './Degree/Degree'

class Style extends GlobalStyle {
  entry = {
    ...this.d_ib,
    ...this.bxz_bb,
    padding: "10px 20px"
  }

  selectInput = {
    minWidth: "300px"
  }
  chips = {
    display : "flex",
    flexWrap: "wrap"
  }
  chip = {
    margin: "5px"
  }
}
class State {
  startDegree: DictDataWordDegree = 0
  endDegree: DictDataWordDegree = 10
  selectedTagIds: string[] = []
}
class Props extends DefaultProps {
  startDegree: DictDataWordDegree
  endDegree: DictDataWordDegree
  selectedTagIds: string[]

  onDegreeRangeChange = ( start: DictDataWordDegree, end: DictDataWordDegree ) => {}
  onTagIdsChange = ( tagIds: string[] ) => {}
}

export default mapStateAndStyle<Props>( new Style() )(
  class FilterSection extends BasicComponent<Props, State> {
    state = new State()

    onStartDegreeChange = newDegree => {
      const { onDegreeRangeChange } = this.props
      this.setState( { startDegree: newDegree }, () => {
        const { startDegree, endDegree } = this.state
        onDegreeRangeChange && onDegreeRangeChange( startDegree, endDegree )
      } )
    }

    onEndDegreeChange = newDegree => {
      const { onDegreeRangeChange } = this.props
      this.setState( { endDegree: newDegree }, () => {
        const { startDegree, endDegree } = this.state
        onDegreeRangeChange && onDegreeRangeChange( startDegree, endDegree )
      } )
    }

    onTagSelectChange = e => {
      const { onTagIdsChange } = this.props
      this.setState( { selectedTagIds: e.target.value }, () => {
        const { selectedTagIds } = this.state
        if ( notNil( onTagIdsChange ) ) {
          onTagIdsChange( selectedTagIds )
        }
      } )
    }

    render() {
      const { classes: c, dispatch, onDegreeRangeChange } = this.props
      const { tags } = selector.coreState
      const { props, state } = this
      
      const startDegree = getValueNotUndefined( props.startDegree, state.startDegree )
      const endDegree = getValueNotUndefined( props.endDegree, state.endDegree )
      const selectedTagIds = getValueNotUndefined( props.selectedTagIds, state.selectedTagIds )
      return (
        <div className={c.entry}>
          <div>
            <h4>Degree Range</h4>
            <div className={c.d_f__ai_c}>
              <span>From</span>
              &nbsp;&nbsp;
              <Degree
                degree={startDegree}
                onChange={this.onStartDegreeChange}
              />
              &nbsp;&nbsp;
              <span>To</span>
              &nbsp;&nbsp;
              <Degree degree={endDegree} onChange={this.onEndDegreeChange} />
            </div>
            {tags.length > 0 && (
              <div>
                <h4>Tags</h4>
                <Select
                  multiple
                  value={selectedTagIds}
                  onChange={this.onTagSelectChange}
                  input={
                    <Input
                      className={c.selectInput}
                      placeholder="Select tags"
                    />
                  }
                  renderValue={( selectedTagIds: string[] ) => (
                    <div className={c.chips}>
                      {selectedTagIds.map( tagId => {
                        const { name } = selector.getTagByTagId( tagId )
                        return (
                          <Chip key={tagId} label={name} className={c.chip} />
                        )
                      } )}
                    </div>
                  )}
                >
                  {tags.map( ( tag: Tag ) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                  ) )}
                </Select>
              </div>
            )}
          </div>
        </div>
      )
    }
  }
)
