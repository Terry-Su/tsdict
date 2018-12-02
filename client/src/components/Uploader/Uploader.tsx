import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"

export default mapStateAndStyle( {
  inputLabel: {
    position: "absolute",
    left    : "0",
    top     : "0",
    width   : "100%",
    height  : "100%",
    cursor  : "pointer",
    // background: 'deepskyblue',
  },
  input: {
    display: "none"
  }
} )(
  class Uploader extends Component<any, any> {
    onInputChange = event => {
      const { onChange } = this.props
      const reader = new FileReader()
      const onReaderLoad = event => {
        onChange && onChange( event.target.result )
      }

      reader.onload = onReaderLoad
      reader.readAsText( event.target.files[ 0 ] )
    }

    render() {
      const { classes: c } = this.props
      return (
        <label className={c.inputLabel} onChange={this.onInputChange}>
          <input type="file" className={c.input} />
        </label>
      )
    }
  }
)
