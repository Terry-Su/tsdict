import Foo from './Foo'

export default class Bar {
  foo: Foo

  flag: number = 1

  SWITCH_FLAG () { this.flag *= -1 }

  test = () => {
    // this.foo.INCREMENT_COUNT()
    // this.foo.INCREMENT_COUNT()
    // this.SWITCH_FLAG()
    console.log(this.foo.countText)
  }
}
