import path from 'path'
import compressImage from '../../compressImage'

describe( "long asynchronous specs", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000
  it( "", done => {
    const imageSrc = path.resolve( __dirname, '../../../store/for-test/compressImage/imageSrc.jpeg' )
    const imageDist = path.resolve( __dirname, '../../../store/for-test/compressImage/imageDist.jpeg' )
    compressImage( imageSrc, imageDist )
  } )

  // ... other codes
} )