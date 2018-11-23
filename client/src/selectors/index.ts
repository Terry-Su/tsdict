import { DictDataWord } from "../../../shared/__typings__/DictData"
import { app } from "../entry"

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




export const getServer = () => {
  return app[ "_store" ].getState().setting.server
}