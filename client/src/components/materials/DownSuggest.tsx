import React, { Component } from 'react'

import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'

export default mapStateAndStyle( {
  entry: {
    position : "absolute",
    left     : 0,
    zIndex   : 100,
    width    : "100%",
    maxHeight: "300px",
    overflow : 'auto',

  }
} )(
  class DownSuggest extends Component<
    {
      suggestAlgorithm?: ( text: string, texts: string[] ) => string[]
      text: string
      texts?: string[]
      onItemClick: Function

      classes: any
      className: string
    },
    {
      shallShow: boolean
    }
  > {
    state = {
      shallShow: true
    }

    defaultSuggestAlgorithm = ( text: string, texts: string[] ) => {
      return texts
        .filter( value => text.trim() !== "" && value.startsWith( text ) )
        .sort( ( a: string, b: string ) => {
          return a.length > b.length ? 1 : -1
        } )
    }

    get suggestions(): string[] {
      const { suggestAlgorithm, text, texts } = this.props
      const algorithm = notNil( suggestAlgorithm ) ?
        suggestAlgorithm :
        this.defaultSuggestAlgorithm
      const res = algorithm( text, texts )
      return res
    }

    componentDidUpdate( prevProps, prevState ) {
      prevState.shallShow === false  && this.setState( { shallShow: true } )
    }

    render() {
      const { classes: c, onItemClick, className } = this.props
      const { suggestions } = this
      const has = suggestions.length > 0
      const { shallShow } = this.state
      return (
        shallShow &&
        has && (
          <Paper className={`${c.entry} ${className}`}>
            <List>
              {this.suggestions.map( ( suggestion, index ) => (
                <ListItem
                  key={index}
                  button
                  onClick={e => {
                    this.setState( { shallShow: false } )
                    onItemClick( suggestion, e )
                  }}
                >
                  {suggestion}
                </ListItem>
              ) )}
            </List>
          </Paper>
        )
      )
    }
  }
)
