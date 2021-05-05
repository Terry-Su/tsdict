import ModifyModel from "../ModifyModel"

describe( 'Test', function () {
  this.timeout( 2000000 )
  it( 'Async unit ', done => {    
  ( async () => {
    await ModifyModel( { body: { ModelId: 1, Map: { name: 'newModel1', note: 'newNote1' } } }, { send: () => {} }, null )
    done()
  } )()

  } )
} )


