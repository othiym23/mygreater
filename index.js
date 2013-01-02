'use strict';

var Migrations = require('./migrations');

function nop() {}

module.exports = {
  Migrations : Migrations,
  apply : function (set, callback) {
    if (!callback) callback = nop;
    set.migrations.forEach(function (migration) {
      migration.apply(callback);
    });
  },
  revert : function (set, callback) {
    if (!callback) callback = nop;
    set.migrations.forEach(function (migration) {
      migration.revert(callback);
    });
  }
};
