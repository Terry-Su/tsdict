export default class Audio {
  text: string = ''
  available: boolean = false

  SET_TEXT = text => { this.text = text }
  AVAILABLE = () => { this.available = true }
  UNAVAILABLE = () => { this.available = false }

  play = (text: string = '') => {
    this.UNAVAILABLE()
    this.SET_TEXT(text)
    setTimeout(() => this.AVAILABLE(), 0)
  }

  stop = () => {
    this.UNAVAILABLE()
  }
}
