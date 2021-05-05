// # dir
export class Dir {
  id: number
  name: string
  previousId: number
}

export class DirTreeItem {
  dir: Dir
  childrenBriefModels: BriefModel[] = []
  childrenDirTreeItems: DirTreeItem[] = []
}

// # model
export class BriefModel {
  id: number
  dirId: number
  name: string
}
export class Model {
  id: number
  dirId: number
  name: string
  note: string
}
