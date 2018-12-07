import { node } from '_@types_prop-types@15.5.6@@types/prop-types'
import { isPlainObject } from 'lodash'
import React, { Component } from 'react'
import { isString } from 'util'

import { Tree } from '@/__typings__'
import withLongPress from '@/components/highOrder/withLongPress'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import List from '@material-ui/core/List'

import TreeViewTreeItem from './TreeViewTreeItem'
import TreeViewWordItem from './TreeViewWordItem'

const DecoratedDiv = withLongPress( ( props: any ) => <div {...props}>{props.children}</div> )

export default mapStateAndStyle()(
  class TreeView extends Component<
    {
      theTree: Tree,
      onItemLongPress: Function,
    },
    any
  > {
    render() {
      const { theTree, onItemLongPress } = this.props
      const { nodes } = theTree
      return (
        <List>
          {nodes.map( node => (
            <DecoratedDiv key={isString( node ) ? node : node.id} onLongPress={ () => onItemLongPress && onItemLongPress( node ) }>
              {isPlainObject( node ) ? (
                <TreeViewTreeItem theTree={node} />
              ) : (
                <TreeViewWordItem key={node} wordId={node} />
              )}
            </DecoratedDiv>
          ) )}
        </List>
      )
    }
  }
)
