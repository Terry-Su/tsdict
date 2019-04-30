import React, { Component } from 'react'

import { reduxStore } from './entry'
// import BasicComponent, { DefaultProps } from '@/components/BasicComponent'
import { Action, Selector, State } from './utils/decorators'

interface Props {
  
}

@State( 'foo', 'count' ) 
@Selector( 'foo', 'countText' )
@Action( 'foo', 'increase', 'decrease' )
@State( 'bar', 'flag' )
@Action( 'bar', 'test' )
@Action( 'bar', 'SWITCH_FLAG' )
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
    this.increase( 1 )
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