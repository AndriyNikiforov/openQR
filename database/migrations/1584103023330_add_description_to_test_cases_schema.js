'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDescriptionToTestCasesSchema extends Schema {
  up () {
    this.table('test_cases', (table) => {
      table.string('description').nullable();
    });
  }

  down () {
    this.table('test_cases', (table) => {
      table.dropColumn('description');
    });
  }
}

module.exports = AddDescriptionToTestCasesSchema
