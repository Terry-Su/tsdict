import '../index'


import { generateMdxDataToHtml, generatePhoneticSymbols } from '../actions';
import { STORE_DICTS_1_MDX_SOURCE, STORE_DICTS_1_HTML } from '../constants/paths';

// generateMdxDataToHtml( STORE_DICTS_1_MDX_SOURCE, STORE_DICTS_1_HTML )

// generatePhoneticSymbols()




describe("long asynchronous specs", function() {
  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000;
  });

  it("takes a long time", function(done) {
    setTimeout(function() {
      done();
    }, 9000000);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});

