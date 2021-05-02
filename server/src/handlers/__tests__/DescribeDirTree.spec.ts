import DescribeDirTree from "../DescribeDirTree"

describe( 'Test', function () {
  this.timeout( 2000000 )
  it( 'Async unit ', done => {    
  ( async () => {
    await DescribeDirTree( { body: { DirId: 1000 } }, { send: res => {
      console.log( res )
    } }, null )
    done()
  } )()

  } )
} )