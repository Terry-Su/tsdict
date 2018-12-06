import {
  defaultOnlineLinks,
  defaultWords,
  defaultTree
} from "../constants/default"
import { cloneDeep, findIndex, isEqual, isNil } from "../utils/lodash"
import {
  DictDataWord,
  DictDataWordDegree
} from "../../../shared/__typings__/DictData"
import { OnlineLink, ClientData, Tag, Tree } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"
import { TAG_IDS } from "../constants/shared"
import { NoteData } from "../components/Note/Note"
import selector from "../selectors"
import { removeArrayElement, removeArrayElementByIndex } from "../utils/js"
import CommonModelReducer from "../utils/CommonModelReducer"

export class CoreState {
  words: DictDataWord[] = defaultWords
  tags: Tag[] = []
  tree: Tree = defaultTree
  onlineLinks: OnlineLink[] = defaultOnlineLinks
}

export default {
  namespace: "core",
  state    : {
    ...new CoreState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      // online links
      UPDATE_ONLINE_LINKS = ( state, { value } ) => ( {
        ...state,
        onlineLinks: value
      } )
      ADD_ONLINE_LINK = ( state, { value } ) => ( {
        ...state,
        onlineLinks: [ ...state.onlineLinks, value ]
      } )
      UPDATE_ONLINE_LINK = ( state, { index, key, value } ) => ( {
        ...state,
        onlineLinks: state.onlineLinks.map( ( link, theIndex ) => {
          if ( theIndex === index ) {
            link[ key ] = value
          }
          return link
        } )
      } )
      REMOVE_ONLINE_LINK = ( state, { value }: { value: number } ) => {
        removeArrayElementByIndex( state.onlineLinks, value )
        return {
          ...state
        }
      }
      ENABLE_ONLINE_LINK = (
        state,
        { index, value = false }: { index: number; value: boolean }
      ) => ( {
        ...state,
        onlineLinks: state.onlineLinks.map( ( link, theIndex ) => {
          if ( theIndex === index ) {
            link.disabled = value
          }
          return link
        } )
      } )
      DISABLE_ONLINE_LINK = (
        state,
        { index, value }: { index: number; value: boolean }
      ) => this.ENABLE_ONLINE_LINK( state, { index, value } )
      TOGGLE_ONLINE_LINK = ( state, { value: index }: { value: number } ) => {
        return this.ENABLE_ONLINE_LINK( state, {
          index,
          value: !state.onlineLinks[ index ].disabled
        } )
      }

      // cached
      ADD_WORD = ( state, { value }: { value: DictDataWord } ) => {
        return {
          ...state,
          words: [ ...state.words, value ]
        }
      }

      UPDATE_WORD = ( state, { word, key, value } ) => ( {
        ...state,
        words: state.words.map( theWord => {
          if ( isEqual( word, theWord ) ) {
            theWord[ key ] = value
          }
          return theWord
        } )
      } )

      UPDATE_WORDS = ( state, { value: words } ) => ( {
        ...state,
        words
      } )

      UPDATE_WORD_NOTE = ( state, { word, value } ) =>
        this.UPDATE_WORD( state, {
          word,
          key: "note",
          value
        } )

      UPDATE_WORD_DEGREE = ( state, { word, value } ) =>
        this.UPDATE_WORD( state, {
          word,
          key: "degree",
          value
        } )

      UPDATE_WORD_NAME = ( state, { word, value } ) => {
        const notExistWordName = !selector.getExistsWordName( value )
        return notExistWordName ?
          this.UPDATE_WORD( state, {
              word,
              key: "name",
              value
            } ) :
          state
      }

      REMOVE_WORD = ( state, { value }: { value: DictDataWord } ) => {
        removeArrayElement( state.words, value )
        return { ...state }
      }

      // UPDATE_WORD_ADD_ARRAY_ITEM = ( state, { word, key, value } ) =>
      //   this.UPDATE_WORD( state, {
      //     word,
      //     key,
      //     value: [ ...word[ key ], value ]
      //   } )
      // UPDATE_WORD_UPDATE_ARRAY_ITEM = ( state, { word, key, index, value } ) => {
      //   word[ key ][ index ] = value
      //   return this.UPDATE_WORD( state, {
      //     word,
      //     key,
      //     value: word[ key ]
      //   } )
      // }
      // UPDATE_WORD_REMOVE_ARRAY_ITEM = ( state, { word, key, index } ) =>
      //   this.UPDATE_WORD( state, {
      //     word,
      //     key,
      //     value: cloneAndRemoveArrayElementByIndex( word[ key ], index )
      //   } )

      ADD_TAG = ( state, { tag }: { tag: Tag } ) => ( {
        ...state,
        tags: [ ...state.tags, tag ]
      } )

      ADD_WORD_ID_TO_TAG_NAME = (
        state: ClientData,
        { wordId, tagName }: { tagName: string; wordId: string }
      ) => {
        const { tags } = state

        const targetTag: Tag = tags.filter( ( { name } ) => name === tagName )[ 0 ]

        if ( isNil( targetTag ) ) {
          // No such a tag name

          const tag: Tag = createTag( tagName, [ wordId ] )
          return this.ADD_TAG( state, { tag } )
        } else {
          // there's already the tag name

          return this.UPDATE_TAG_ADD_WORD_ID( state, { tag: targetTag, wordId } )
        }
      }

      UPDATE_TAG = ( state, { tag, ids }: { tag: Tag; ids: string[] } ) => ( {
        ...state,
        tags: state.tags.map( theTag => {
          if ( isEqual( tag, theTag ) ) {
            theTag[ TAG_IDS ] = ids
          }
          return theTag
        } )
      } )

      UPDATE_TAG_ADD_WORD_ID = (
        state,
        { tag, wordId }: { tag: Tag; wordId: string }
      ) =>
        this.UPDATE_TAG( state, {
          tag,
          ids: [ ...tag[ TAG_IDS ], wordId ]
        } )

      UPDATE_TAG_REMOVE_WORD_ID = (
        state,
        { tag, wordId }: { tag: Tag; wordId: string }
      ) => {
        const newIds = removeArrayElement( tag[ TAG_IDS ], wordId )
        if ( newIds.length > 0 ) {
          // ids is not empty
          return {
            ...state
          }
        } else {
          // ids is not empty
          return this.REMOVE_TAG( state, { tag } )
        }
      }

      UPDATE_TAG_NAME = (
        state,
        { tag, newName }: { tag: Tag; newName: string }
      ) => ( {
        ...state,
        tags: state.tags.map( theTag => {
          if ( theTag === tag ) {
            theTag.name = newName
          }
          return theTag
        } )
      } )

      UPDATE_ALL_TAGS_REMOVE_USELESS_WORD_IDS = ( state: ClientData ) => {
        state.tags.forEach( tag => {
          const { ids } = tag
          ids.forEach( id => {
            const word = selector.getWordByWordId( id )
            if ( isNil( word ) ) {
              removeArrayElement( ids, id )
            }
          } )
        } )
        return { ...state }
      }

      REMOVE_TAG = ( state, { tag }: { tag: Tag } ) => {
        removeArrayElement( state.tags, tag )
        return { ...state }
      }


      // ## tree
      UPDATE_TREE_NAME = ( state: CoreState, { tree, newName }: { tree: Tree, newName: string } ) => {
        tree.name = newName 
        return {
          ...state
        }
      }
    }()
  },
  effects: {
    refresh( payload, { put, select } ) {
      const onlineLinks = select( state => state.core.onlineLinks )
      // console.log( onlineLinks )
      // yield put( { type: "UPDATE_ONLINE_LINKS", value: [] } )
    },
    *removeLongPressingTag( payload, { put } ) {
      const { longPressingTag: tag } = selector.tagPageState
      yield put( { type: "REMOVE_TAG", tag } )
    },
    *removeLongPressingWord( payload, { put } ) {
      const { longPressingWord: value } = selector.tagPageState
      yield put( { type: "REMOVE_WORD", value } )
      yield put( { type: "UPDATE_ALL_TAGS_REMOVE_USELESS_WORD_IDS" } )
    }
  }
}

export const createOnlineLink = ( {
  id,
  label,
  url,
  disabled,
  after
}: OnlineLink ): OnlineLink => ( {
  id,
  label,
  url,
  disabled,
  after
} )

export const createWord = (
  name: string,
  config: { note?: NoteData; degree?: DictDataWordDegree } = { degree: 0 }
) => ( {
  id    : getUniqueId(),
  name,
  note  : config.note,
  degree: config.degree
} )

export const createTag = ( name: string, ids: string[] = [] ) => ( {
  id: getUniqueId(),
  name,
  ids
} )
