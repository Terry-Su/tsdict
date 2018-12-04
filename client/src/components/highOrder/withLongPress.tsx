import React, { Component } from "react"

export default function( Target: any ) {
  return class LongClick extends Component<{
    onLongPress: Function
  }, any> {
    INTERVAL = 1000

    timer

    onPress = e => {
      clearTimeout( this.timer )
      this.timer = setTimeout( () => {
        const { onLongPress } = this.props
        onLongPress && onLongPress( e )
      },this.INTERVAL )
    }

    onRelease = () => {
      clearTimeout( this.timer )
    }

    render() {
      return <span style={{ display: 'inline-block' }} onMouseDown={ this.onPress } onMouseUp={ this.onRelease } onMouseOut={ this.onRelease } >
        <Target { ...this.props }/>
      </span>
    }
  }
}
