import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { TreeAddMode, createTree } from "../../../models/treePage"
import selector from "../../../selectors"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import { GlobalStyle, GS } from "../../../style/globalStyle"
import Degree from "../../Degree/Degree"
import {
  DictDataWordDegree,
  DictDataWord
} from "../../../../../shared/__typings__/DictData"
import { notNil, isNil } from "../../../utils/lodash"
import { createWord } from "../../../models/core"
import DownSuggestContainer from "../../materials/DownSuggestContainer"
import DownSuggest from "../../materials/DownSuggest"

class State {
  treeName: string = ""
  wordName: string = ""
  degree: DictDataWordDegree = 0
}

export default mapStateAndStyle( {
  entry: {
    minWidth: "200px",
    padding : "20px"
  },
  downSuggest: {
    maxHeight: '100px',
  },
  bottomButtons: {
    display       : "flex",
    justifyContent: "flex-end"
  },
} )(
  class TheAddDialog extends Component<
    {
      dispatch: Function
      classes: any
    },
    State
  > {
    state = new State()

    get wordInStore(): DictDataWord {
      return selector.getWordByWordName( this.state.wordName )
    }

    get isNewWord(): boolean {
      return isNil( this.wordInStore )
    }

    onDialogClose = () => {}

    onRadioChange = e => {
      this.props.dispatch( {
        type : "treePage/UPDATE_ADD_MODE",
        value: e.target.value
      } )
    }

    onTreeNameChange = e => {
      this.setState( {
        treeName: e.target.value
      } )
    }

    onWordNameChange = e => {
      this.setState( {
        wordName: e.target.value
      } )
    }

    onDegreeChange = degree => {
      const { wordInStore, isNewWord } = this
      if ( isNewWord ) {
        this.setState( {
          degree
        } )
      } else {
        this.props.dispatch( {
          type : "core/UPDATE_WORD_DEGREE",
          word : wordInStore,
          value: degree
        } )
      }
    }

    onConfirmClick = () => {
      switch ( selector.treePageState.addMode ) {
        case TreeAddMode.Tree:
          this.confirmAddFoler()
          break
        case TreeAddMode.WordId:
          this.confirmAddWord()
          break
      }
      this.close()
    }

    confirmAddFoler = () => {
      const { dispatch } = this.props
      const { treeName } = this.state
      const canBeAdded = notNil( treeName ) && treeName.trim() !== ""
      canBeAdded &&
        dispatch( { type: "treePage/ADD_TREE", tree: createTree( treeName ) } )
    }

    confirmAddWord = () => {
      const { isNewWord } = this
      const { wordName, degree } = this.state
      const { dispatch } = this.props
      if ( isNewWord ) {
        const canBeAdded = notNil( wordName ) && wordName.trim() !== ""
        const word: DictDataWord = createWord( wordName, { degree } )
        if ( canBeAdded ) {
          dispatch( { type: "core/ADD_WORD", value: word } )
          dispatch( { type: "treePage/ADD_WORD_ID", wordId: word.id } )
        }
      } else {
        const { wordInStore } = this
        dispatch( { type: "treePage/ADD_WORD_ID", wordId: wordInStore.id } )
      }
    }

    close = () => {
      this.props.dispatch( { type: "treePage/HIDE_ADD_DIALOG" } )
      // reset state
      setTimeout( () => {
        this.setState( new State() )
      }, 200 )
    }

    render() {
      const { classes: c } = this.props
      const { addMode, isAddDialogOpen } = selector.treePageState
      const { treeName, wordName, degree } = this.state
      const { wordInStore, isNewWord } = this

      const filteredDegree = isNewWord ? degree : wordInStore.degree
      const { wordNames } = selector

      return (
        <Dialog open={isAddDialogOpen} onClose={this.close}>
          <DialogTitle>Add</DialogTitle>
          <div className={c.entry}>
            <FormControl className={c.entry}>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                value={addMode}
                onChange={this.onRadioChange}
              >
                <FormControlLabel
                  className={c.radioLabel}
                  value={TreeAddMode.Tree}
                  control={<Radio />}
                  label="Folder"
                />
                <FormControlLabel
                  className={c.radioLabel}
                  value={TreeAddMode.WordId}
                  control={<Radio />}
                  label="Word"
                />
              </RadioGroup>
            </FormControl>

            <br />

            {// # tree area
            addMode === TreeAddMode.Tree && (
              <div className={c.d_f__jc_c__ai_c}>
                <Input
                  value={treeName}
                  onChange={this.onTreeNameChange}
                  placeholder="Tree name"
                />
              </div>
            )}

            {// # word area
            addMode === TreeAddMode.WordId && (
              <div>
                <div className={c.d_f__jc_c__ai_c}>
                  <DownSuggestContainer>
                    <Input
                      value={wordName}
                      onChange={this.onWordNameChange}
                      placeholder="Word name"
                    />
                    <DownSuggest
                      className={ c.downSuggest }
                      text={wordName}
                      texts={wordNames}
                      onItemClick={name => {
                        this.setState( {
                          wordName: name
                        } )
                      }}
                    />
                  </DownSuggestContainer>
                </div>
                <br />
                <br />
                <div className={c.d_f__jc_c__ai_c}>
                  <Degree
                    degree={filteredDegree}
                    onChange={this.onDegreeChange}
                  />
                </div>
              </div>
            )}

            <br />
            <br />

            <div className={c.bottomButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onConfirmClick}
              >
                Confirm
              </Button>
              &nbsp;&nbsp;
              {/* <Button variant="contained" color="secondary">
                Cancel
              </Button> */}
            </div>
          </div>
        </Dialog>
      )
    }
  }
)
