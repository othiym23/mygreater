'use strict';

function Migrations () {
  this.migrations = [];
}

Migrations.prototype.add = function add(migration) {
  this.migrations.push(migration);
};

module.exports = Migrations;
