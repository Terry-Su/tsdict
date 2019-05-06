import { reduxStore } from '@/entry'

import Bar from './Bar'

export default class Foo {
  bar: Bar

  count: number = 1

  get countText(){ return `## Count is ${this.count}` }

  INCREMENT_COUNT = () => { this.count++ }

  
  increase( count ) {
    this.count = this.count + count 
    // this.bar.SWITCH_FLAG()
  }  
  decrease = count => { this.count = this.count - count }

}
