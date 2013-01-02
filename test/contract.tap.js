'use strict';

var tap        = require('tap')
  , test       = tap.test
  , mygreater  = require('../index')
  , Migrations = mygreater.Migrations
  ;

var data = [0, 1, 2, 3]
  , set  = new Migrations()
  ;

set.add({
  apply  : function (next) { data.push(4); next(); },
  revert : function (next) { data.pop(); next (); }
});

test("basic async migration", function (t) {
  t.plan(4);

  mygreater.apply(set, function () {
    t.equal(data.length, 5, "element was added to data");
    t.deepEqual(data, [0, 1, 2, 3, 4], "data is correct");

    mygreater.revert(set, function () {
      t.equal(data.length, 4, "element was removed on rollback");
      t.deepEqual(data, [0, 1, 2, 3], "data was restored on rollback");

      t.end();
    });
  });
});

test("basic sync migration", function (t) {
  t.plan(4);

  mygreater.apply(set);
  t.equal(data.length, 5, "element was added to data");
  t.deepEqual(data, [0, 1, 2, 3, 4], "data is correct");

  mygreater.revert(set);
  t.equal(data.length, 4, "element was removed on rollback");
  t.deepEqual(data, [0, 1, 2, 3], "data was restored on rollback");

  t.end();
});
