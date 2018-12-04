import { defaultOnlineLinks, defaultWords } from "../constants/default"
import { cloneDeep, findIndex, isEqual, isNil } from "../utils/lodash"
import { DictDataWord } from "../../../shared/__typings__/DictData"
import { OnlineLink, ClientData, Tag } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"
import { TAG_IDS } from "../constants/shared"

const state: ClientData = {
  onlineLinks: defaultOnlineLinks,
  words      : defaultWords,
  tags       : []
}

export default {
  namespace: "mainData",
  state,
  reducers : {
    ...new class {
      UPDATE_STATE = ( state, { value } ) => value

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
      REMOVE_ONLINE_LINK = ( state, { value }: { value: number } ) => ( {
        ...state,
        onlineLinks: removeArrayElementByIndex( state.onlineLinks, value )
      } )
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

      REMOVE_WORD = ( state, { value } ) => ( {
        ...state,
        words: removeArrayElement( state.words, value )
      } )

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
      //     value: removeArrayElementByIndex( word[ key ], index )
      //   } )

      
      ADD_TAG = ( state, { tag }: { tag: Tag } ) => ( {
        ...state,
        tags: [ ...state.onlineLinks, tag ]
      } )

      ADD_WORD_ID_TO_TAG_NAME = ( state: ClientData, { wordId, tagName }: {tagName: string, wordId: string} ) => {
        const { tags } = state
        
        const targetTag: Tag = tags.filter( ( { name } ) => name === tagName )[ 0 ]

        if ( isNil( targetTag )  ) {
          // No such a tag name

          const tag: Tag = createTag( tagName, [ wordId ] )
          return this.ADD_TAG( state, { tag }  )
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
      ) =>
        this.UPDATE_TAG( state, {
          tag,
          ids: removeArrayElement( tag[ TAG_IDS ], wordId )
        } )
    }()
  },
  effects: {
    refresh( payload, { put, select } ) {
      const onlineLinks = select( state => state.mainData.onlineLinks )
      console.log( onlineLinks )
      // yield put( { type: "UPDATE_ONLINE_LINKS", value: [] } )
    }
  }
}

function removeArrayElement( array, element ) {
  let cloned = cloneDeep( array )
  const index = findIndex( cloned, item => isEqual( item, element ) )

  if ( index !== -1 ) {
    cloned.splice( index, 1 )
    return cloned
  }

  throw `unexpected removeArrayElement! index: ${index}`
}

function removeArrayElementByIndex( array, index: number ) {
  let cloned = cloneDeep( array )
  if ( index !== -1 ) {
    cloned.splice( index, 1 )
    return cloned
  }

  throw `unexpected removeArrayElement! index: ${index}`
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

export const createWord = ( { id, name, note }: DictDataWord ) => ( {
  id,
  name,
  note,
  degree: 0
} )



export const createTag = ( name: string, ids: string[] = [] ) => ( {
  id: getUniqueId(),
  name,
  ids
} )

