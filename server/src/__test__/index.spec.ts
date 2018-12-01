import '../index'
// describe( "Test", () => {
//   it( "Unit", () => {
//     // hello()

//     console.log( 123 )
//   } )
// } )


describe("long asynchronous specs", function() {
  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it("takes a long time", function(done) {
    setTimeout(function() {
      done();
    }, 900000);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});