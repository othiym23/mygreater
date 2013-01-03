'use strict';

var Migrations = require('./migrations');

function nop() {}

function migrate(operation, set, callback) {
  if (!callback) callback = nop;

  set.migrations.forEach(function (migration) {
    set.resolve(migration, function (err) {
      if (err) return callback(err);

      migration[operation](callback);
    });
  });
}

module.exports = {
  Migrations : Migrations,
  apply  : migrate.bind(null, 'apply'),
  revert : migrate.bind(null, 'revert')
};
