import { DictDataWord } from "../../../shared/__typings__/DictData"

export const getCanBeAdded = ( component ): Boolean => {
  const { app, mainData } = component.props
  const { searching } = app
  const { words } = mainData
  return (
    searching.trim() !== "" && words.every( ( { name } ) => name !== searching )
  )
}



export const getCurrentWord = ( component ): DictDataWord => {
  const { app, mainData } = component.props
  const { searching } = app
  const { words } = mainData
  return words.filter( ( { name } ) => name === searching )[ 0 ] || {}
}