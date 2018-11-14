import { defaultOnlineLinks } from "../constants/default"
import { cloneDeep } from "../utils/lodash"
import { DictDataWord } from "../../../shared/__typings__/DictData"

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
      onlineLinks: [ ...state.onlineLinks, value ]
    } ),
    REMOVE_ONLINE_LINK_BY_NAME: ( state, { value } ) => ( {
      ...state,
      onlineLinks: removeArrayElementByName( state.onlineLinks, value )
    } ),
    ENABLE_ONLINE_LINK_BY_NAME: ( state, { value }: { value: string } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( link => {
        if ( link.name === value ) {
          link.enabled = true
        }
        return link
      } )
    } ),
    DISABLE_ONLINE_LINK_BY_NAME: ( state, { value }: { value: string } ) => ( {
      ...state,
      onlineLinks: state.onlineLinks.map( link => {
        if ( link.name === value ) {
          link.enabled = false
        }
        return link
      } )
    } ),
    ADD_CACHED_WORD: ( state, { value }: { value: DictDataWord } ) => ( {
      ...state,
      cachedWords: [ ...state.cachedWords, value ]
    } ),
    REMOVE_CACHED_WORD_BY_NAME: ( state, { value }: { value: string } ) => ( {
      ...state,
      cachedWords: removeArrayElementByName( state.cachedWords, value )
    } ),
  },
  effects: {}
}

function removeArrayElementByName( array, name ) {
  const cloned = cloneDeep( array )
  const index = cloned.map( ( { name } ) => name ).indexOf( name )
  cloned.splice( index, 1 )
  return cloned
}
