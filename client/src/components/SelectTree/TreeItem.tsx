import React, { Component } from 'react'

import { Tree } from '@/__typings__'
import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { GlobalStyle } from '@/style/globalStyle'
import { isWordItem } from '@/utils/getters'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import ExpandingIcon from '@material-ui/icons/KeyboardArrowDown'
import FoldingIcon from '@material-ui/icons/KeyboardArrowRight'

import Item from './Item'

class Props extends DefaultProps {
  tree: Tree
  active: boolean
  selectedTreeId: string
  enableWord: boolean
  isRoot: boolean

  onClick?: Function
  onSelectedTreeIdChange: Function
}
class State {
  isExpanding: boolean = false
}
class Style extends GlobalStyle {
  entry = {}

  mainItem = {
    display   : "flex",
    alignItems: "center"
  }

  leftIcon = {
    display       : 'inline-flex',
    justifyContent: 'center',
    alignItems    : 'center',
    width         : '50px',
    height        : "100%",
    // background    : "#dfdfdf"
  }

  subItemsContainer = {
    margin: "0 0 0 20px"
  }

  active = {
    background: "deepSkyBlue"
  }
}

const TreeItem = mapStateAndStyle<Props>( new Style() )(
  class TreeItemClass extends BasicComponent<Props, State> {
    state = new State()

    get filtered() {
      const { enableWord, tree } = this.props
      const { nodes } = tree
      if ( !enableWord ) {
        return nodes.filter( node => !isWordItem( node ) )
      }
      return nodes
    }

    onExpandClick = () => {
      this.setState( prevState => ( {
        isExpanding: !prevState.isExpanding
      } ) )
    }

    render() {
      const {
        classes: c,
        dispatch,
        tree,
        selectedTreeId,
        onSelectedTreeIdChange,
        enableWord,
        active,
        isRoot,
      } = this.props
      const { isExpanding } = this.state
      const { filtered } = this
      return (
        <div className={c.entry}>
          <div className={`${c.mainItem} ${active ? c.active : ""}`}>
            <div className={c.leftIcon} onClick={this.onExpandClick}>
              { ! isRoot && filtered.length > 0 &&
                ( ( isExpanding ) ? <ExpandingIcon /> : <FoldingIcon /> )}
            </div>

            <ListItem
              onClick={e => {
                onSelectedTreeIdChange && onSelectedTreeIdChange( tree.id )
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tree.name} />
            </ListItem>
          </div>
          {( isExpanding || isRoot ) && (
            <div className={c.subItemsContainer}>
              {filtered.map( ( treeNode, index ) => (
                <Item
                  key={index}
                  treeNode={treeNode}
                  selectedTreeId={selectedTreeId}
                  onSelectedTreeIdChange={onSelectedTreeIdChange}
                  enableWord={enableWord}
                />
              ) )}
            </div>
          )}
        </div>
      )
    }
  }
)

export default TreeItem
