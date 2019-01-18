import React, { Component } from 'react'

import { notNil, uniq } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'

import BasicComponent, { DefaultProps } from '../BasicComponent'
import VirtualScrollingList from '../VirtualScrollingList/VirtualScrollingList'

class Props extends DefaultProps {
  suggestAlgorithm?: ( text: string, texts: string[] ) => string[]
  text: string
  texts?: string[]
  onItemClick: Function
  onItemMouseDown: Function

  enableTextsWhenEmpty: boolean

  recentTexts: string[]

  classes: any
  className: string
}

class State {
  shallShow: boolean = true
}

export default mapStateAndStyle( {
  entry: {
    position : "absolute",
    left     : 0,
    zIndex   : 100,
    width    : "100%",
    height   : '300px',
    maxHeight: "300px",
    overflow : "auto"
  }
} )(
  class DownSuggest extends BasicComponent<Props, State> {
    state = { ...new State() }

    defaultSuggestAlgorithm = ( text: string, texts: string[] ) => {
      return texts
        .filter( value => text.trim() !== "" && value.startsWith( text ) )
        .sort( ( a: string, b: string ) => {
          return a.length > b.length ? 1 : -1
        } )
    }

    get suggestions(): string[] {
      const {
        suggestAlgorithm,
        text,
        texts,
        enableTextsWhenEmpty,
        recentTexts
      } = this.props

      if ( enableTextsWhenEmpty && text.trim() === "" ) {
        if ( notNil( recentTexts ) && recentTexts.length > 0 ) {
          const filtered = recentTexts.filter( recentText =>
            texts.includes( recentText )
          )
          return uniq( [ ...filtered, ...texts ] )
        }
        return texts
      }

      const algorithm = notNil( suggestAlgorithm ) ?
        suggestAlgorithm :
        this.defaultSuggestAlgorithm
      const res = algorithm( text, texts )
      return res
    }

    componentDidMount() {
      const { text, enableTextsWhenEmpty } = this.props
      if ( enableTextsWhenEmpty && text.trim() === "" ) {
        this.setState( { shallShow: true } )
      }
    }

    componentDidUpdate( prevProps, prevState ) {
      prevState.shallShow === false && this.setState( { shallShow: true } )
    }

    render() {
      const { classes: c, onItemClick, className, onItemMouseDown } = this.props
      const { suggestions } = this
      const has = suggestions.length > 0
      const { shallShow } = this.state

      return (
        shallShow &&
        has && (
          <Paper className={`${c.entry} ${className}`}>
            {/* <List> */}
            <VirtualScrollingList
              items={suggestions}
              render={( { style, virtualScrollingItem: suggestion } ) => (
                <ListItem
                  style={style}
                  button
                  onClick={e => {
                    this.setState( { shallShow: false } )
                    onItemClick && onItemClick( suggestion, e )
                  }}
                  onMouseDown={e => {
                    this.setState( { shallShow: false } )
                    onItemMouseDown && onItemMouseDown( suggestion, e )
                  }}
                >
                  {suggestion}
                </ListItem>
              )}
            />
            {/* </List> */}
          </Paper>
        )
      )
    }
  }
)
