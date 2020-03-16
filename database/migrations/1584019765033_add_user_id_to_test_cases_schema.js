'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdToTestCasesSchema extends Schema {
  up () {
    this.table('test_cases', (table) => {
      table.integer('user_id');
    });
  }

  down () {
    this.table('test_cases', (table) => {
      table.dropColumn('user_id');
    });
  }
}

module.exports = AddUserIdToTestCasesSchema
