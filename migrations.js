'use strict';

var util = require('util');

function Migrations () {
  this.migrations = [];
  this.ids = {};
}

Migrations.prototype.add = function add(migration) {
  this.migrations.push(migration);
  if (migration.id) this.ids[migration.id] = migration;
};

Migrations.prototype.lookup = function lookup(id) {
  return this.ids[id];
};

Migrations.prototype.resolve = function resolve(migration, callback) {
  if (migration && migration.depends) {
    var depends = migration.depends;
    if (typeof depends !== 'array') depends = [depends];

    depends.forEach(function (dependency) {
      var id = dependency.id;
      if (id && !this.lookup(id)) {
        return callback(new Error(util.format("dependency '%s' not found", id)));
      }
    }.bind(this));
  }
  else {
    callback();
  }
};

module.exports = Migrations;
