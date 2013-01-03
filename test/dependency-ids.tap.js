'use strict';

var tap        = require('tap')
  , test       = tap.test
  , mygreater  = require('../index')
  , Migrations = mygreater.Migrations
  ;

function asyncNop(next) { return next(); }

test("migrations with IDs dependent on one another",
     function (t) {
  t.test("when the prior dependency is missing and async", function (t) {
    t.plan(2);

    var set = new Migrations();
    set.add({
      id : 'arbitrary',
      depends : {id : 'predecessor'},
      apply : asyncNop,
      revert : asyncNop
    });

    mygreater.apply(set, function (err) {
      t.ok(err, "dependency check correctly failed");
      t.equals(err.message, "dependency 'predecessor' not found", "error messages match");
    });
  });

  t.end();
});
