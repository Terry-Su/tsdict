import { defaultOnlineLinks } from "../constants/default"
import { cloneDeep, findIndex, isEqual } from "../utils/lodash"
import { DictDataWord } from "../../../shared/__typings__/DictData"
import { OnlineLink } from "../__typings__/index.spec"
import getUniqueId from "../utils/getUniqueId"

export default {
  namespace: "mainData",
  state    : {
    onlineLinks: defaultOnlineLinks,
    cachedWords: []
  },
  reducers: {
    UPDATE_ONLINE_LINKS: ( state, { value } ) => ( {
      ...state,
      onlineLinks: value
    } ),
    ADD_ONLINE_LINK: ( state, { value } ) => ( {
      ...state,
      onlineLinks: [ ...state.onlineLinks, {
        ...value,
        id: getUniqueId()
      } ]
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
    ADD_CACHED_WORD: ( state, { value }: { value: DictDataWord } ) => ( {
      ...state,
      cachedWords: [ ...state.cachedWords, value ]
    } ),
    // REMOVE_CACHED_WORD_BY_NAME: ( state, { value }: { value: string } ) => ( {
    //   ...state,
    //   cachedWords: removeArrayElement( state.cachedWords, value )
    // } ),
  },
  effects: {}
}

function removeArrayElement( array, link ) {
  let cloned = cloneDeep( array )
  const index = findIndex( cloned, item => isEqual( item, link ) )

  if ( index !== -1 ) {
    cloned.splice( index, 1 )
    return cloned
  }
  
  throw `unexpected removeArrayElement! index: ${index}`
}
