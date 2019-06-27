import { TypeId } from './'

export enum ReviewMode {
  Random,
  None,
  Standard
}

export enum ReviewWordReviewedType {
  REVIEWED,
  NOT_REVIEWED,
  REVIEWED_AND_NOT_REVIEWED,
}


export type ReviewLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface StandardReviewStatDayMap {
  // # dayTime format: '0000-00-00'
  [dayTime: string]: {
    count: number
  }
}

export interface StandardReviewStat {
  dayMap: StandardReviewStatDayMap
}


export interface StandardReviewedWordsInfoToday {
  today: string
  wordIds: TypeId[]
}
