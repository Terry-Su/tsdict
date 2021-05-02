// # dir
export class Dir {
  id: number
  name: string
  previousId: number
}

export class DirTreeItem {
  dir: Dir
  childrenModels: Model[] = []
  childrenDirTreeItems: DirTreeItem[] = []
}

// # model
export class Model {
  id: number
  dirId: number
  name: string
  note: string
}
