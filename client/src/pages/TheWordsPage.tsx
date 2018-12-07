import { Link } from 'dva/router'
import React, { Component } from 'react'

import FilterSection from '@/components/FilterSection'
import TopbarLayout from '@/components/layouts/TopbarLayout'
import { HOME_ROUTE } from '@/constants/routes'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default mapStateAndStyle( {
  listItem: {
    cursor: "pointer",
    border: "1px solid #ddd"
  }
} )(
  class TheWordsPage extends Component<any, any> {
    removingWord = null

    state = {
      anchorEl: null,
    }

    onWordNameClick = value => {
      this.props.dispatch( { type: "app/UPDATE_SEARCHING", value } )
    }

    onMoreClick = ( event, word ) => {
      this.setState( {
        anchorEl: event.currentTarget
      } )
      this.removingWord = word
    }

    onRemoveClick = () => {
      this.props.dispatch( { type: "core/REMOVE_WORD", value: this.removingWord } )
      this.removingWord = null
      this.closeMenu()
    }

    closeMenu = () => {
      this.setState( {
        anchorEl: null
      } )
    }

    render() {
      const { core, classes: c } = this.props
      const { words } = core
      const { anchorEl } = this.state
      return (
        <TopbarLayout>
          <FilterSection />
          <List>
            {words.map( word => (
              <ListItem
                key={word.id}
                className={c.listItem}
                onClick={() => this.onWordNameClick( word.name )}
              >
                <Link to={HOME_ROUTE}>{word.name}</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  onClick={event => this.onMoreClick( event, word )}
                >
                  ...
                </Button>
              </ListItem>
            ) )}
          </List>
          <Menu
            anchorEl={anchorEl}
            open={Boolean( anchorEl )}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={() => this.onRemoveClick()}>Delete</MenuItem>
          </Menu>
        </TopbarLayout>
      )
    }
  }
)
