import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import TopbarLayout from "../layouts/TopbarLayout"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Link } from "dva/router"
import { HOME_ROUTE } from "../../constants/routes"

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
      this.props.dispatch( { type: "mainData/REMOVE_WORD", value: this.removingWord } )
      this.removingWord = null
      this.closeMenu()
    }

    closeMenu = () => {
      this.setState( {
        anchorEl: null
      } )
    }

    render() {
      const { mainData, classes: c } = this.props
      const { words } = mainData
      const { anchorEl } = this.state
      return (
        <TopbarLayout>
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
            <MenuItem onClick={() => this.onRemoveClick()}>Remove</MenuItem>
          </Menu>
        </TopbarLayout>
      )
    }
  }
)
