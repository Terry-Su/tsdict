import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import selector from "../../selectors"
import { CalcTree } from "../../models/tree"
import { Tree, TreeNode } from "../../__typings__"
import { node } from "_@types_prop-types@15.5.6@@types/prop-types"
import TreeViewItem from "./TreeViewWordItem"
import { isString, isPlainObject } from "../../utils/lodash"
import List from "@material-ui/core/List"
import TreeViewTreeItem from "./TreeViewTreeItem"
import TreeViewWordItem from "./TreeViewWordItem"
import withLongPress from "../highOrder/withLongPress"

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
