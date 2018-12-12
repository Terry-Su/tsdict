import React, { Component } from 'react'

import { Tree, TreeNode } from '@/__typings__'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import WordItem from '@/pages/TheTreePage/TheTreeView/WordItem'
import selector from '@/selectors'
import { GlobalStyle } from '@/style/globalStyle'
import { isTreeItem, isWordItem } from '@/utils/getters'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Button, List, Menu } from '@material-ui/core'

import Item from './Item'
import TreeItem from './TreeItem'

class Props extends DefaultProps {
  enableWord: boolean

  onConfirm: Function
  onCancel: Function
}
class State {
  selectedTreeId: string
}
class Style extends GlobalStyle {
  entry = {
    width : "100%",
    height: "100%"
  }

  listContainer = {
    height  : "calc( 100% - 56px )",
    overflow: "auto"
  }

  buttonsContainer = {
    display       : "flex",
    justifyContent: "flex-end",
    alignItems    : "center",
    padding       : "10px 0",
    "&>button"    : {
      margin: "0 20px 0 0"
    }
  }
}

export default mapStateAndStyle<Props>( new Style() )(
  class SelectTree extends BasicComponent<Props, State> {
    state = new State()

    get filtered() {
      const { enableWord } = this.props
      const { nodes } = selector.coreState.tree
      if ( !enableWord ) {
        return nodes.filter( node => !isWordItem( node ) )
      }
      return nodes
    }

    onSelectedTreeIdChange = selectedTreeId => this.setState( { selectedTreeId } )

    render() {
      const {
        classes: c,
        dispatch,
        enableWord = true,
        onConfirm,
        onCancel
      } = this.props
      const { tree } = selector.coreState
      const { selectedTreeId } = this.state
      const { filtered } = this
      return (
        <div className={c.entry}>
          <div className={c.listContainer}>
            <List>
              {[ tree ].map( ( treeNode, index ) => (
                <Item
                  key={index}
                  treeNode={treeNode}
                  selectedTreeId={selectedTreeId}
                  onSelectedTreeIdChange={this.onSelectedTreeIdChange}
                  enableWord={enableWord}
                  isRoot={true}
                />
              ) )}
            </List>
          </div>
          <div className={c.buttonsContainer}>
            <Button variant="contained" onClick={() => onCancel && onCancel()}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onConfirm && onConfirm( selectedTreeId )}
            >
              Confirm
            </Button>
          </div>
        </div>
      )
    }
  }
)
