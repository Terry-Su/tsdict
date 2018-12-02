import { defaultOnlineLinks, defaultWords } from "../constants/default"
import { cloneDeep, findIndex, isEqual } from "../utils/lodash"
import { DictDataWord } from "../../../shared/__typings__/DictData"
import { OnlineLink } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"

class Reducers {
  UPDATE_STATE  =( state, { value } ) => value
  
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
  ENABLE_ONLINE_LINK = ( state, { index, value = false }: { index: number, value: boolean } ) => ( {
    ...state,
    onlineLinks: state.onlineLinks.map( ( link, theIndex ) => {
      if ( theIndex === index ) {
        link.disabled = value
      }
      return link
    } )
  } )
  DISABLE_ONLINE_LINK = ( state, { index, value }: { index: number, value: boolean } ) => this.ENABLE_ONLINE_LINK( state, { index, value } )
  TOGGLE_ONLINE_LINK = ( state, { value: index }: { value: number} ) => {
    return this.ENABLE_ONLINE_LINK( state, { index, value: ! state.onlineLinks[ index ].disabled } )
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

  UPDATE_WORD_NOTE = ( state, { word, value } ) => this.UPDATE_WORD( state, {
    word,
    key: 'note',
    value
  } )

  UPDATE_WORD_ADD_ARRAY_ITEM = ( state, { word, key, value } ) =>
    this.UPDATE_WORD( state, {
      word,
      key,
      value: [ ...word[ key ], value ]
    } )
  UPDATE_WORD_UPDATE_ARRAY_ITEM = ( state, { word, key, index, value } ) => {
    word[ key ][ index ] = value
    return this.UPDATE_WORD( state, {
      word,
      key,
      value: word[ key ]
    } )
  }
  UPDATE_WORD_REMOVE_ARRAY_ITEM = ( state, { word, key, index } ) =>
    this.UPDATE_WORD( state, {
      word,
      key,
      value: removeArrayElementByIndex( word[ key ], index )
    } )

  UPDATE_WORD_ADD_ONE_NOTE = ( state, { word, value } ) =>
    this.UPDATE_WORD_ADD_ARRAY_ITEM( state, { word, key: "notes", value } )

  UPDATE_WORD_UPDATE_ONE_NOTE = (
    state,
    { word, index, value }: { word: string; value: string; index: number }
  ) =>
    this.UPDATE_WORD_UPDATE_ARRAY_ITEM( state, {
      word,
      key: "notes",
      index,
      value
    } )

  UPDATE_WORD_REMOVE_ONE_NOTE = (
    state,
    { word, value: index }: { word: string; value: number }
  ) => this.UPDATE_WORD_REMOVE_ARRAY_ITEM( state, { word, key: "notes", index } )

  UPDATE_WORD_ADD_A_PICTURE = ( state, { word, value } ) =>
  this.UPDATE_WORD_ADD_ARRAY_ITEM( state, { word, key: "pictures", value } )

  UPDATE_WORD_UPDATE_A_PICTURE = (
    state,
    { word, index, value }: { word: string; value: string; index: number }
  ) =>
    this.UPDATE_WORD_UPDATE_ARRAY_ITEM( state, {
      word,
      key: "pictures",
      index,
      value
    } )

  UPDATE_WORD_REMOVE_A_PICTURE = (
    state,
    { word, value: index }: { word: string; value: number }
  ) => this.UPDATE_WORD_REMOVE_ARRAY_ITEM( state, { word, key: "pictures", index } )
  

  REMOVE_WORD = ( state, { value } ) => ( {
    ...state,
    words: removeArrayElement( state.words, value )
  } )
}

export default {
  namespace: "mainData",
  state    : {
    onlineLinks: defaultOnlineLinks,
    words      : defaultWords,
  },
  reducers: {
    ...new Reducers()
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

export const createWord = ( {
  id,
  name,
  note,
}: DictDataWord ) => ( {
  id,
  name,
  note
} )
