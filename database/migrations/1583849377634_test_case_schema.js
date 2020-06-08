'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestCaseSchema extends Schema {
  up () {
    this.create('test_cases', (table) => {
      table.increments().unsigned();
      table.string('title');
      table.integer('project_id');
      table.integer('status_id').nullable();
      table.timestamps();

      table.foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE');
    });
  }

  down () {
    this.drop('test_cases')
  }
}

module.exports = TestCaseSchema
