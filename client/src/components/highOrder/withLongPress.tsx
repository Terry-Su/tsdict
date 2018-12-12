import React, { Component } from 'react'

export default function( Target: any ) {
  return function LongPressContainer( props: any ) {
    const { className = "",onLongPress, ...others } = props
    return <LongPress onLongPress={onLongPress}>
    <Target {...others} />
    </LongPress>
  }
}

export class LongPress extends Component<
  {
    onLongPress: Function
    className?: string
  },
  any
> {
  INTERVAL = 600

  timer

  onPress = e => {
    clearTimeout( this.timer )
    this.timer = setTimeout( () => {
      const { onLongPress } = this.props
      onLongPress && onLongPress( e )
    }, this.INTERVAL )
  }

  onRelease = () => {
    clearTimeout( this.timer )
  }

  render() {
    const { className = "", children } = this.props
    return (
      <div
        className={className}
        onMouseDown={this.onPress}
        onTouchStart={this.onPress}
        onMouseUp={this.onRelease}
        onTouchEnd={this.onRelease}
        onMouseOut={this.onRelease}
      >
        {children}
      </div>
    )
  }
}



// class LongPressContainer extends Component<
//     {
//       onLongPress: Function
//       className?: string
//     },
//     any
//   > {
//     INTERVAL = 600

//     timer

//     onPress = e => {
//       clearTimeout( this.timer )
//       this.timer = setTimeout( () => {
//         const { onLongPress } = this.props
//         onLongPress && onLongPress( e )
//       }, this.INTERVAL )
//     }

//     onRelease = () => {
//       clearTimeout( this.timer )
//     }

//     render() {
//       const { className = "", ...others } = this.props
//       return (
//         <div
//           className={className}
//           onMouseDown={this.onPress}
//           onTouchStart={this.onPress}
//           onMouseUp={this.onRelease}
//           onTouchEnd={this.onRelease}
//           onMouseOut={this.onRelease}
//         >
//           <Target {...others} />
//         </div>
//       )
//     }
//   }