import { SortType } from '@/components/SortSection'
import selector from '@/selectors'
import { DictDataWord, DictDataWordDegree } from '@shared/__typings__/DictData'

export function filterWordsBySelectedTagIds(
  words: DictDataWord[],
  selectedTagIds: string[]
) {
  return words.filter( word => {
    const tags = selector.getWordTags( word.id )
    const tagIds = tags.map( tag => tag.id )
    return (
      selectedTagIds.length === 0 ||
      selectedTagIds.some( selectedTagId => tagIds.includes( selectedTagId ) )
    )
  } )
}

export function filterWordsByDegreeRange(
  words: DictDataWord[],
  startDegree: DictDataWordDegree,
  endDegree: DictDataWordDegree
) {
  return words.filter( word => {
    const { degree } = word
    return (
      startDegree <= endDegree && degree >= startDegree && degree <= endDegree
    )
  } )
}

class SortWordsConfig {
  sortType: SortType = SortType.Name
  isAscendingName: boolean = true
  isAscendingDegree: boolean = true
}
export function sortWords(
  words: DictDataWord[],
  config: SortWordsConfig = new SortWordsConfig()
) {
  let res = [ ...words ]
  const {
    sortType,
    isAscendingName,
    isAscendingDegree
  } = config


  res.sort( ( a, b ) => {
    const {
      name: nameA,
      degree: degreeA = 0
    } = a
    const {
      name: nameB,
      degree: degreeB = 0
    } = b
    // main sort
    switch ( sortType ) {
      case SortType.Name:
        if ( nameA > nameB ) {
          return isAscendingName ? 1 : -1
        }
        if ( nameA < nameB ) {
          return isAscendingName ? -1 : 1
        }
        break
      case SortType.Degree:
        if ( degreeA > degreeB ) {
          return isAscendingDegree ? 1 : -1
        }
        if ( degreeA < degreeB ) {
          return isAscendingDegree ? -1 : 1
        }
        break
    }

    // second sort
    // a.key === b.key
    // compare the others
    if ( nameA > nameB ) {
      return isAscendingName ? 1 : -1
    }
    if ( nameA < nameB ) {
      return isAscendingName ? -1 : 1
    }
    if ( degreeA > degreeB ) {
      return isAscendingDegree ? 1 : -1
    }
    if ( degreeA < degreeB ) {
      return isAscendingDegree ? -1 : 1
    }
    return 0
  } )

  return res
}


export function sortBySize(
  sizeA: any,
  sizeB: any,
  isAscending: boolean = true
) {
  if ( sizeA > sizeB ) {
    return isAscending ? 1 : -1
  }
  if ( sizeA < sizeB ) {
    return isAscending ? -1 : 1
  }
  return 0
}
