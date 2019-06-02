import { TypeId } from './'

export enum ReviewMode {
  Random,
  None,
  Standard
}

export type ReviewLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface StandardReviewDataStatistics {
  dateMap: {
    [dateTime: number]: { count: number }
  }
}


export interface StandardReviewData {
  statistics: StandardReviewDataStatistics
}