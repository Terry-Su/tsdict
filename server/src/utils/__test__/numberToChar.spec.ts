import numberToChars from '../numberToChars'

describe( "numberToChars", function() {
  it( "", () => {
    const testing = [
      [ 40, '12' ],
      [ 38, '10' ],
      [ 0, '0' ],
      [ 10, 'a' ],
      [ 38 * 38, '100' ],
    ]
    testing.forEach( v => {
      const res = numberToChars( v[ 0 ] )
      expect( ( res as any ) ).toBe( v[ 1 ] )
    } )
  } )
} )