import React, { Component } from "react"

export default function( Target: any ) {
  return class LongPress extends Component<{
    onLongPress: Function
    className?: string
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
      const { onLongPress, className = '', ...others } = this.props
      return <div className={ className } onMouseDown={ this.onPress } onMouseUp={ this.onRelease } onMouseOut={ this.onRelease } >
        <Target { ...others }/>
      </div>
    }
  }
}
