'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDeletedToTestCasesSchema extends Schema {
  up () {
    this.table('test_cases', (table) => {
      table.string('deleted').defaultTo('n');
    });
  }

  down () {
    this.table('add_deleted_to_test_cases', (table) => {
      table.dropColumn('deleted');
    });
  }
}

module.exports = AddDeletedToTestCasesSchema
