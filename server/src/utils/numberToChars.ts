let basicString = '0123456789abcdefghijklmnopqrstuvwxyz'
export default function numberToChars( num ): string {
  if ( num >= 0 ) {
    const { length } = basicString
    let res = ''

    // # get max power
    let divided = num
    let maxPower = 0
    while ( divided >= 36 ) {
      divided = Math.floor( divided / 36 )
      maxPower++
    } 


    // # get res by max power
    let currentPower = maxPower
    let remaining = num
    while ( currentPower >= 0 ) {
      const index = Math.floor( remaining / Math.pow( length, currentPower ) )
      res = res + basicString[ index ]

      remaining = remaining % Math.pow( length, currentPower )
      currentPower--
    }

    return res
  }
  return null
}