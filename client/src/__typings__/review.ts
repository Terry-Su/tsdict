import { TypeId } from './'

export enum ReviewMode {
  Random,
  None,
  Standard
}

export type ReviewLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

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