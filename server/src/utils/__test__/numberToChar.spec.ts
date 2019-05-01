import numberToChars from '../numberToChars'

describe( "numberToChars", function() {
  it( "", () => {
    const testing = [
      [ 0, '0' ],
      [ 10, 'a' ],
      [ 36, '10' ],
      [ 36 * 36, '100' ],
      [ 1000, 'rs' ],
    ]
    testing.forEach( v => {
      const res = numberToChars( v[ 0 ] )
      expect( ( res as any ) ).toBe( v[ 1 ] )
    } )
  } )
} )