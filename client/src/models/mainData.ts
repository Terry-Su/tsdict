import { defaultOnlineLinks, defaultWords } from "../constants/default"
import { cloneDeep, findIndex, isEqual } from "../utils/lodash"
import { DictDataWord } from "../../../shared/__typings__/DictData"
import { OnlineLink } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"

export default {
  namespace: "mainData",
  state    : {
    onlineLinks: defaultOnlineLinks,
    words      : defaultWords
  },
  reducers: {
    // online links
    UPDATE_ONLINE_LINKS: ( state, { value } ) => ( {
      ...state,
      onlineLinks: value
    } ),
    ADD_ONLINE_LINK: ( state, { value } ) => ( {
      ...state,
      onlineLinks: [ ...state.onlineLinks, value ]
    } ),
    UPDATE_ONLINE_LINK: ( state, { link, key, value } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( theLink => {
        if ( isEqual( link, theLink ) ) {
          theLink[ key ] = value
        }
        return theLink
      } )
    } ),
    REMOVE_ONLINE_LINK: ( state, { value }: { value: OnlineLink } ) => ( {
      ...state,
      onlineLinks: removeArrayElement( state.onlineLinks, value )
    } ),
    ENABLE_ONLINE_LINK_: ( state, { value }: { value: OnlineLink } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( link => {
        if ( link === value ) {
          link.disabled = false
        }
        return link
      } )
    } ),
    DISABLE_ONLINE_LINK: ( state, { value }: { value: OnlineLink } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( link => {
        if ( link === value ) {
          link.disabled = true
        }
        return link
      } )
    } ),
    TOGGLE_ONLINE_LINK_: ( state, { value }: { value: OnlineLink } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( link => {
        if ( link === value ) {
          link.disabled = ! link.disabled
        }
        return link
      } )
    } ),

    // cached
    ADD_WORD: ( state, { value }: { value: DictDataWord } ) => ( {
      ...state,
      words: [ ...state.words, value ]
    } ),

    UPDATE_WORD: ( state, { word, key, value } ) => ( {
      ...state,
      words: state.words.map( theWord => {
        if ( isEqual( word, theWord ) ) {
          theWord[ key ] = value  
        }
        return theWord
      } )
    } ),
    
    REMOVE_WORD: ( state, { value } ) => ( {
      ...state,
      words: removeArrayElement( state.words, value )
    } )
  },
  effects: {}
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


export const createOnlineLink = ( {
  id,
  label,
  url,
  disabled,
  after,
}: OnlineLink ): OnlineLink => ( {
  id,
  label,
  url,
  disabled,
  after,
} )

export const createWord = ( {
  id,
  name,
  comments,
  pictures,
  audios,
  videos
}: DictDataWord ) => ( {
  id,
  name,
  comments,
  pictures,
  audios,
  videos
} )