import { isEqual, isNil } from 'lodash'

import { OnlineLink, Tag, Tree } from '@/__typings__'
import { NoteData } from '@/components/Note/Note'
import { defaultOnlineLinks, defaultTree, defaultWords } from '@/constants/default'
import { TAG_IDS } from '@/constants/shared'
import selector from '@/selectors'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { isTreeItem } from '@/utils/getters'
import getUniqueId from '@/utils/getUniqueId'
import { removeArrayElement, removeArrayElementByIndex } from '@/utils/js'
import { DictDataWord, DictDataWordDegree, Time } from '@shared/__typings__/DictData'

import { getNodesTrees, getNodesWordIds } from './treePage'

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

      UPDATE_WORD_P = ( state, { word, p } ) => {
        return this.UPDATE_WORD( state, {
          word,
          key  : "p",
          value: p
        } )
      }

      REMOVE_WORD_IDS_OF_WORD_IN_TREES = ( state : CoreState, { word }: { word: DictDataWord } ) => {
        const { rootTree } = selector
        const { words } = selector.coreState
        const wordIds = words.map( word => word.id )
        new CalcTree( rootTree ).removeUselessWordIds( wordIds )

        return { ...state }
      } 

      REMOVE_WORD_AND_RELATED = ( state, { value }: { value: DictDataWord } ) => {
        removeArrayElement( state.words, value )
        this.UPDATE_ALL_TREES_REMOVE_USELESS_WORD_IDS( state )
        this.UPDATE_ALL_TAGS_REMOVE_USELESS_WORD_IDS( state )
        return { ...state }
      }

      ADD_TAG = ( state, { tag }: { tag: Tag } ) => ( {
        ...state,
        tags: [ ...state.tags, tag ]
      } )

      ADD_WORD_ID_TO_TAG_NAME = (
        state: CoreState,
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

      UPDATE_ALL_TAGS_REMOVE_USELESS_WORD_IDS = ( state: CoreState ) => {
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

      UPDATE_ALL_TREES_REMOVE_USELESS_WORD_IDS = ( state: CoreState ) => {
        new CalcTree( selector.rootTree ).removeUselessWordIds( selector.wordIds )
        return { ...state }
      }

      REMOVE_TREE = ( state, { tree }: { tree: Tree }  ) => {
        const treeAbove = selector.getTreeAbove( tree.id )
        removeArrayElement( treeAbove.nodes, tree  )
        return { ...state }
      }

      MOVE_TREE_A_TO_B = ( state, { from, to }: {from: string, to: string} ) => {
        new CalcTree( selector.rootTree ).moveAtoB( from, to )
        return { ...state }
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
    *removeLongPressingTagWord( payload, { put } ) {
      const { longPressingWord: word } = selector.tagPageState
      const { currentTag: tag } = selector
      yield put( { type: "UPDATE_TAG_REMOVE_WORD_ID", tag, wordId: word.id } )
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
  config: { note?: NoteData; degree?: DictDataWordDegree, createTime?: Time } = { degree: 0 }
) => ( {
  id        : getUniqueId(),
  name,
  note      : config.note,
  degree    : config.degree,
  createTime: new Date().getTime()
} )

export const createTag = ( name: string, ids: string[] = [] ) => ( {
  id: getUniqueId(),
  name,
  ids
} )

export class CalcTree {
  tree: Tree

  constructor( tree: Tree ) {
    this.tree = tree
  }

  getAIncludesB( aId: string, bId: string ): boolean {
    let res = false

    function recurToGet( tree ) {
      tree.nodes.filter( isTreeItem ).forEach( subTree => {
        if ( subTree.id === bId ) {
          res = true
        }
        recurToGet( subTree )
      } )
    }

    const tree = this.getTreeById( aId )
    recurToGet( tree )

    return res
  }

  getTreeById( treeId: string ): Tree {
    let res: Tree = null
    const self = this
    function recurToGetTree( tree: Tree, id: string ) {
      if ( tree.id === id ) {
        // matched

        res = tree
      } else {
        // not matched
        const nodesTrees = getNodesTrees( tree )
        nodesTrees.forEach( newTree => recurToGetTree( newTree, id ) )
      }
    }
    recurToGetTree( this.tree, treeId )
    return res
  }

  getTreeAbove( treeId: string ): Tree {
    let res: Tree
    const self = this
    function recurToGetTree( tree: Tree, id: string ) {
      const nodesTrees = getNodesTrees( tree )
      const isIdInTreesBelow = nodesTrees.some( tree => tree.id === id )
      if ( isIdInTreesBelow ) {
        res = tree
      } else {
        nodesTrees.forEach( newTree => recurToGetTree( newTree, id ) )
      }
    }
    recurToGetTree( this.tree, treeId )
    return res
  }

  removeUselessWordIds( usefulWordIds: string[] ) {
    function recurToRemove( tree: Tree ) {
      const nodesWordIds = getNodesWordIds( tree )
      const removingIds = nodesWordIds.filter( id => !usefulWordIds.includes( id ) )

      const { nodes } = tree      
      removingIds.forEach( wordId => removeArrayElement( nodes, wordId ) )

      const nodesTrees = getNodesTrees( tree )
      nodesTrees.forEach( newTree => recurToRemove( newTree ) )
    }
    recurToRemove( this.tree )
  }

  moveAtoB( aId: string, bId: string ) {
    const aIncludesB = this.getAIncludesB( aId, bId )
    if ( ! aIncludesB ) {
      const aTree = this.getTreeById( aId )
      const cacheATree = aTree

      // remove A
      const aAbove = this.getTreeAbove( aId )
      removeArrayElement( aAbove.nodes, aTree  )


      // move to b
      const bTree = this.getTreeById( bId )
      bTree.nodes.push( cacheATree )
    }
  }
}
