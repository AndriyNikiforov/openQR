'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestCaseSchema extends Schema {
  up () {
    this.create('test_cases', (table) => {
      table.increments().unsigned();
      table.integer('user_id').unsigned();
      table.string('title', 50);
      table.text('description');
      table.text('files');
      table.integer('status_id').unsigned().nullable();
      table.string('deleted', 1).defaultTo('n');
      table.integer('project_id').unsigned();
      table.timestamps();
    });
  }

  down () {
    this.drop('test_cases')
  }
}

module.exports = TestCaseSchema
