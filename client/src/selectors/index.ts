import { DictDataWord } from "../../../shared/__typings__/DictData"
import { root } from "../entry"
import models from "../models"
import { pick } from "../utils/lodash"
import { Tag, ClientData } from "../__typings__";


class Selector {
  get state() {
    return root[ "_store" ].getState()
  }

  get storeData() {
    const storeKeys = Object.keys( models )
    const data = pick( root[ "_store" ].getState(), storeKeys )
    return data
  }

  get appState() {
    return this.state.app
  }

  get mainDataState(): ClientData {
    return this.state.mainData
  }

  get settingState() {
    return this.state.setting
  }

  get wordCanBeAdded(): boolean {
    const { searching } = this.appState
    const { words } = this.mainDataState
    return (
      searching.trim() !== "" && words.every( ( { name } ) => name !== searching )
    )
  }

  get wordIsAdded(): boolean {
    return !this.wordCanBeAdded
  }

  get shallShowWordPanel() {
    const { searching } = this.appState
    return searching.trim() !== "" && !this.wordCanBeAdded
  }

  get currentWord(): DictDataWord {
    const { searching } = this.appState
    const { words } = this.mainDataState
    return <any>words.filter( ( { name } ) => name === searching )[ 0 ] || {}
  }

  get currentTags(): Tag[] {
    const { id }  = this.currentWord
    return this.mainDataState.tags.filter( ( {ids} ) => ids.includes( id ) )
  }

  get server(): string {
    const {
      server,
      isSameHostName,
      port
    } = this.settingState
    return isSameHostName ? `http://${location.hostname}:${port}` : server
  }
}

const selector = new Selector()
export default selector
