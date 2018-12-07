import { SortType } from '@/components/SortSection'
import CommonModelReducer from '@/utils/CommonModelReducer'
import { DictDataWordDegree } from '@shared/__typings__/DictData'

export class WordPageState {
  sortType: SortType = SortType.Name
  isAscendingName: boolean = true
  isAscendingDegree: boolean = true

  startDegree: DictDataWordDegree = 0
  endDegree: DictDataWordDegree = 10
  selectedTagIds: string[] = []
}

export default {
  namespace: "wordPage",
  state    : {
    ...new WordPageState()
  },
  reducers: {
    ...new class extends CommonModelReducer {
      UPDATE_SORT_TYPE = this.UPDATE_STATE_KEY( 'sortType' )
      UPDATE_IS_ASCENDING_NAME = this.UPDATE_STATE_KEY( 'isAscendingName' )
      UPDATE_IS_ASCENDING_DEGREE = this.UPDATE_STATE_KEY( 'isAscendingDegree' )

      UPDATE_START_DEGREE = this.UPDATE_STATE_KEY( 'startDegree' )
      UPDATE_END_DEGREE = this.UPDATE_STATE_KEY( 'endDegree' )
      UPDATE_SELECTED_TAG_IDS = this.UPDATE_STATE_KEY( 'selectedTagIds' )
    }()
  },
  effects: {}
}
