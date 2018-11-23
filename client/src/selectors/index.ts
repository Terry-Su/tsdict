import { DictDataWord } from "../../../shared/__typings__/DictData"
import { root } from "../entry"

class Selector {
  get state() {
    return root[ "_store" ].getState()
  }

  get appState() {
    return this.state.app
  }

  get mainDataState() {
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

  get currentWord(): DictDataWord {
    const { searching } = this.appState
    const { words } = this.mainDataState
    return words.filter( ( { name } ) => name === searching )[ 0 ] || {}
  }

  get server(): string {
    return this.settingState.server
  }
}

const selector = new Selector()
export default selector
