import React, { Component } from "react"
import mapStateAndStyle from "../../../utils/mapStateAndStyle"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { TreeAddMode, createTree } from "../../../models/tree"
import selector from "../../../selectors"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import { GlobalStyle, GS } from "../../../style/globalStyle"
import Degree from "../../Degree/Degree"
import { DictDataWordDegree, DictDataWord } from "../../../../../shared/__typings__/DictData"
import { notNil, isNil } from "../../../utils/lodash"
import { createWord } from "../../../models/mainData"

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
  // radioLabel: {
  //   display: "inline-block!important"
  // }
  bottomButtons: {
    display       : "flex",
    justifyContent: "flex-end"
  }
} )(
  class TheAddDialog extends Component<
    {
      open: boolean
      onClose: any

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
        type : "tree/UPDATE_ADD_MODE",
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
        this.props.dispatch( { type: 'mainData/UPDATE_WORD_DEGREE', word: wordInStore, value: degree } )
      }
    }

    onConfirmClick = () => {
      const { onClose } = this.props
      switch( selector.treeState.addMode ) {
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
      const canBeAdded  = notNil( treeName ) && treeName.trim() !== ''
      canBeAdded && dispatch( { type: 'tree/ADD_TREE', tree: createTree( treeName ) } )
    }

    confirmAddWord = () => {
      const { isNewWord } = this 
      const { wordName, degree } = this.state
      const { dispatch, onClose } = this.props
      if ( isNewWord ) {
        const canBeAdded  = notNil( wordName ) && wordName.trim() !== ''
        const word: DictDataWord = createWord( wordName, { degree } )
        if ( canBeAdded ) {
          dispatch( { type: 'mainData/ADD_WORD', value: word } )
          dispatch( { type: 'tree/ADD_WORD_ID', wordId: word.id } )
        }
      } else {
        const { wordInStore } = this
        dispatch( { type: 'tree/ADD_WORD_ID', wordId: wordInStore.id } )
      }
    }

    close = () => {
      const { onClose } = this.props
      onClose && onClose()
      // reset state
      setTimeout( () => {
        this.setState( new State() )
      }, 200 )
    }

    render() {
      const { classes: c, open, onClose } = this.props
      const { addMode } = selector.treeState
      const { treeName, wordName, degree } = this.state
      const { wordInStore, isNewWord } = this

      const filteredDegree = isNewWord ? degree : wordInStore.degree

      return (
        <Dialog open={open} onClose={this.close}>
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

            {// tree area
            addMode === TreeAddMode.Tree && (
              <div className={c.d_f__jc_c__ai_cTAGS_ROUTE}>
                <Input
                  value={treeName}
                  onChange={this.onTreeNameChange}
                  placeholder="Tree name"
                />
              </div>
            )}

            {// word area
            addMode === TreeAddMode.WordId && (
              <div>
                <div className={c.d_f__jc_c__ai_cTAGS_ROUTE}>
                  <Input
                    value={wordName}
                    onChange={this.onWordNameChange}
                    placeholder="Word name"
                  />
                </div>
                <br />
                <br />
                <div className={c.d_f__jc_c__ai_cTAGS_ROUTE}>
                  <Degree degree={filteredDegree} onChange={ this.onDegreeChange }  />
                </div>
              </div>
            )}

            <br />
            <br />
            
            <div className={c.bottomButtons}>
              <Button variant="contained" color="primary" onClick={ this.onConfirmClick }>
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
