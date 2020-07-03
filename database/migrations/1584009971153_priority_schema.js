'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrioritySchema extends Schema {
  up () {
    this.create('priorities', (table) => {
      table.increments().unsigned();
      table.string('name', 50);
      table.integer('index');
      table.integer('user_id').unsigned();
      table.integer('test_case_id').unsigned();
      table.timestamps();
    });
  }

  down () {
    this.drop('priorities')
  }
}

module.exports = PrioritySchema
