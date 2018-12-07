import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const ListItemButton = ( props: any ) => (
  <ListItem button {...props}>
    {props.children}
  </ListItem>
)

class Item {
  label: string
  onClick?: Function
}

class Data {
  items: Item[] = []
}

export default mapStateAndStyle( {
  list: {
    minWidth: "300px"
  }
} )(
  class FunctionDialog extends Component<
    {
      data: Data
      open: boolean
      onClose: any

      classes: any
    },
    any
  > {
    render() {
      const { open = false, onClose, classes: c, data = new Data() } = this.props
      const { items } = data
      return (
        <Dialog open={open} onClose={onClose}>
          {/* <DialogTitle></DialogTitle> */}
          <List className={c.list}>
            {items.map( ( item, index ) => (
              <ListItemButton
                key={index}
                onClick={e => item.onClick && item.onClick( e )}
              >
                {item.label}
              </ListItemButton>
            ) )}
          </List>
        </Dialog>
      )
    }
  }
)
