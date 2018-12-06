import React, { Component } from "react"
import mapStateAndStyle from "../../../../utils/mapStateAndStyle"
import TreeView from "../../../TreeView/TreeView"
import List from "@material-ui/core/List"
import selector from "../../../../selectors"
import { isString, isPlainObject } from "../../../../utils/lodash"
import { TreeNode, Tree } from "../../../../__typings__"
import TreeItem from "./TreeItem"
import WordItem from "./WordItem"



export default mapStateAndStyle()(
  class TheTreeView extends Component<any, any> {

    getTreeItem = ( node: TreeNode ) => {
      if ( isPlainObject( node ) ) {
        return <TreeItem key={ ( node as Tree ).name } tree={ node }/>
      }
      if ( isString( node ) ) {
        const wordId = node
        const word = selector.getWordByWordId( wordId )
        return <WordItem key={wordId} word={ word }/>
      }
    }

    render() {
      const { currentTree } = selector
      const { nodes } = currentTree
      return (
        <div>
          <List>
          {
            nodes.map( node => this.getTreeItem( node ) )
          }
        </List>
        </div>
      )
    }
  }
)



