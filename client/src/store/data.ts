import { DictDataWord } from "../../../shared/__typings__/DictData"

class Data {
  cachedWords: DictDataWord[] = []
  
  ADD_ARRAY_ELEMENT( array, element ) {
    array.push( element )
  }

  REMOVE_ARRAY_ELEMENT( array, name ) {
    const index = this.cachedWords.map( ( { name } ) => name ).indexOf( name )
    array.splice( index, 1 )
  }

  UPDATE_CACHED_WORDS( cachedWords: DictDataWord[] ) {
    this.cachedWords = cachedWords
  }
}


const dataController = new Data() 
export default dataController
