import { isNil } from 'lodash'
import React, { Component } from 'react'

import Degree from '@/components/Degree/Degree'
import DownSuggest from '@/components/DownSuggest/DownSuggest'
import DownSuggestContainer from '@/components/DownSuggest/DownSuggestContainer'
import Input from '@/components/Input/Input'
import { createWord } from '@/models/core'
import { createTree, TreeAddMode } from '@/models/treePage'
import selector from '@/selectors'
import { notNil } from '@/utils/lodash'
import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

import TheAddTagForNewWord from './TheAddTagForNewWord'
import TheAddTagForOldWord from './TheAddTagForOldWord'

class State {
  treeName: string = ""
  wordName: string = ""
  degree: DictDataWordDegree = 0

  isTypingWordName: boolean = false
}

export default mapStateAndStyle( {
  entry: {
    // position: 'fixed',
    // left  : 0,
    // top   : 0,
    // width : document.body.getBoundingClientRect().width,
    // height: document.body.getBoundingClientRect().height,
    // with   : "300px",
    // padding : "10px 30px 20px 30px"
    margin: 0,

    "&>div>div": {
      width    : "80%",
      maxWidth : "100%",
      // height   : "90%",
      maxHeight: "100%",
      margin   : 0
    }
  },
  content: {
    boxSizing: "border-box",
    width    : "100%",
    height   : "100%",
    padding  : "0 20px 20px 20px"
  },
  radiosContainer: {
    display       : "flex",
    justifyContent: "space-around",
    alignItems    : "center"
  },
  radio      : {},
  downSuggest: {
    maxHeight: "100px"
  },
  bottomButtons: {
    display       : "flex",
    justifyContent: "flex-end"
  }
} )(
  class TheAddDialog extends Component<
    {
      dispatch: Function
      classes: any
    },
    State
  > {
    state = { ...new State() }

    treeInputRef = React.createRef()
    wordInputRef = React.createRef()

    get treeInput() {
      return this.treeInputRef.current as HTMLInputElement
    }

    get wordInput() {
      return this.wordInputRef.current as HTMLInputElement
    }

    get wordInStore(): DictDataWord {
      return selector.getWordByWordName( this.state.wordName )
    }

    get isNewWord(): boolean {
      return isNil( this.wordInStore )
    }

    // componentDidMount() {
    //   setTimeout( () => {
    //     const { addMode } = selector.treePageState
    //     addMode === TreeAddMode.Tree && this.treeInput && this.treeInput.focus()
    //     addMode === TreeAddMode.WordId && this.wordInput && this.wordInput.focus()
    //   }, 200 )
    // }

    onDialogClose = () => {}

    onTreeNameChange = e => {
      this.setState( {
        treeName: e.target.value
      } )
    }

    onWordNameChange = e => {
      this.setState( {
        wordName        : e.target.value,
        isTypingWordName: true
      } )
    }

    onWordNameInputBlur = () => {
      this.setState( { isTypingWordName: false } )
    }

    onWordNameInputFocus = () => {
      const { wordName } = this.state
      wordName.trim() !== "" && this.setState( { isTypingWordName: true } )
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

    onCancelClick = () => {
      this.props.dispatch( { type: "treePage/HIDE_ADD_DIALOG" } )
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
        if ( canBeAdded ) {
          const word: DictDataWord = createWord( wordName, { degree } )
          dispatch( { type: "core/ADD_WORD", value: word } )
          dispatch( { type: "treePage/ADD_WORD_ID", wordId: word.id } )

          // add tags
          const { currentTags } = selector.treePageAddDialogState
          currentTags.forEach( tag => {
            dispatch( {
              type   : "core/ADD_WORD_ID_TO_TAG_NAME",
              wordId : word.id,
              tagName: tag.name
            } )
          } )
        }
      } else {
        // is old word
        const { wordInStore } = this

        // check if there's already one
        if ( !selector.currentTree.nodes.includes( wordInStore.id ) ) {
          dispatch( { type: "treePage/ADD_WORD_ID", wordId: wordInStore.id } )
        }
      }
    }

    close = () => {
      this.props.dispatch( { type: "treePage/HIDE_ADD_DIALOG" } )
      // reset state
      setTimeout( () => {
        this.setState( { ...new State() } )
      }, 200 )
    }

    render() {
      const { classes: c, dispatch } = this.props
      const { addMode, isAddDialogOpen } = selector.treePageState
      const { treeName, wordName, degree } = this.state
      const { wordInStore, isNewWord } = this

      const filteredDegree = isNewWord ? degree : wordInStore.degree
      const { wordNames } = selector
      const { isTypingWordName } = this.state

      return (
        <Dialog className={c.entry} open={isAddDialogOpen} onClose={this.close}>
          <DialogTitle>Add</DialogTitle>
          <div className={c.content}>
            <div className={c.radiosContainer}>
              <span>
                <Radio
                  className={c.radio}
                  value={TreeAddMode.Tree}
                  checked={addMode === TreeAddMode.Tree}
                  onChange={e =>
                    dispatch( {
                      type : "treePage/UPDATE_ADD_MODE",
                      value: e.target.value
                    } )
                  }
                />
                <label>Folder</label>
              </span>

              <span>
                <Radio
                  className={c.radio}
                  value={TreeAddMode.WordId}
                  checked={addMode === TreeAddMode.WordId}
                  onChange={e =>
                    dispatch( {
                      type : "treePage/UPDATE_ADD_MODE",
                      value: e.target.value
                    } )
                  }
                />
                <label>Word</label>
              </span>
            </div>

            <br />

            {// # tree area
            addMode === TreeAddMode.Tree && (
              <div className={c.d_f__jc_c__ai_c}>
                <Input
                  autoFocus
                  inputRef={this.treeInputRef}
                  value={treeName}
                  onChange={this.onTreeNameChange}
                  placeholder="Folder name"
                  enableClear
                  onClearMouseDown={() =>
                    this.setState( {
                      treeName: ""
                    } )
                  }
                />
              </div>
            )}

            {// # word area
            addMode === TreeAddMode.WordId && (
              <div>
                <div className={c.d_f__jc_c__ai_c}>
                  <DownSuggestContainer>
                    <Input
                      autoFocus
                      inputRef={this.wordInputRef}
                      value={wordName}
                      onChange={this.onWordNameChange}
                      onBlur={this.onWordNameInputBlur}
                      onFocus={this.onWordNameInputFocus}
                      placeholder="Word name"
                      enableClear
                      onClearMouseDown={() =>
                        this.setState( {
                          wordName        : "",
                          isTypingWordName: true
                        } )
                      }
                    />
                    {isTypingWordName && (
                      <DownSuggest
                        className={c.downSuggest}
                        text={wordName}
                        texts={wordNames}
                        onItemMouseDown={name => {
                          this.setState( {
                            wordName: name
                          } )
                          this.setState( { isTypingWordName: false } )
                        }}
                      />
                    )}
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
                <div className={c.d_f__jc_c__ai_c}>
                  {isNewWord ? (
                    <TheAddTagForNewWord />
                  ) : (
                    <TheAddTagForOldWord word={wordInStore} />
                  )}
                </div>
              </div>
            )}

            <br />
            <br />

            <div className={c.bottomButtons}>
              <Button variant="contained" onClick={this.onCancelClick}>
                Cancel
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                onClick={this.onConfirmClick}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      )
    }
  }
)
