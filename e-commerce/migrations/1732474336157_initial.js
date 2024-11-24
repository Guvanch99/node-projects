/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
const { resolve } = require('path');
const { readFileSync } = require('fs');
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  const path = resolve(__dirname,  '../', 'dbSchema', 'initial/initialUp.sql');
  const sql = readFileSync(path, 'utf-8');
  pgm.sql(sql);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  const path = resolve(__dirname,  '../', 'dbSchema', 'initial/initialDown.sql');
  const sql = readFileSync(path, 'utf-8');
  pgm.sql(sql);
};
