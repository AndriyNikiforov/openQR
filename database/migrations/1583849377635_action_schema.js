'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionSchema extends Schema {
  up () {
    this.create('actions', (table) => {
      table.increments().unsigned();
      table.integer('test_case_id').unsigned();
      table.integer('step_number');
      table.text('actions_desc');
      table.text('result');
      table.timestamps();
    })
  }

  down () {
    this.drop('actions')
  }
}

module.exports = ActionSchema
