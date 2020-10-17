import React, { Component } from 'react'

// import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { Actions, Selectors, States } from './utils/decorators'

interface Props {
  
}

@States( 'foo', 'count' ) 
@Actions( 'foo', 'increase', 'decrease' )
export default class Test extends Component<Props> {
  count?: number
  decoratedCount?: number
  countText?: string
  flag?: number

  INCREMENT_COUNT?: Function
  SWITCH_FLAG?: Function
  increase?: Function
  decrease?: Function
  test?: Function

  componentDidMount() {
    // this.props.test()
    // console.log( this.countText )
    // console.log( this )
  }
  render() {
    return (
      <div>
        Count: { this.count }
        <br /><br />
        <button onClick={ () => this.increase( 1 ) }>+</button>
        <button onClick={ () => this.decrease( 1 ) }>-</button>
      </div>
    )
  }
}