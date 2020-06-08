'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionSchema extends Schema {
  up () {
    this.create('actions', (table) => {
      table.increments();
      table.integer('test_case_id');
      table.integer('step_number');
      table.text('actions_desc');
      table.text('result');
      table.timestamps();

      table.foreign('test_case_id')
        .references('id')
        .inTable('test_cases')
        .onDelete('CASCADE');
    })
  }

  down () {
    this.drop('actions')
  }
}

module.exports = ActionSchema
