import { DictDataWord } from "../../../shared/__typings__/DictData"
import { root } from "../entry"

export const getCanBeAdded = (): Boolean => {
  const { app, mainData } = root[ "_store" ].getState()
  const { searching } = app
  const { words } = mainData
  return (
    searching.trim() !== "" && words.every( ( { name } ) => name !== searching )
  )
}



export const getCurrentWord = (): DictDataWord => {
  const { app, mainData } = root[ "_store" ].getState()
  const { searching } = app
  const { words } = mainData
  return words.filter( ( { name } ) => name === searching )[ 0 ] || {}
}





export const getServer = () => {
  return root[ "_store" ].getState().setting.server
}