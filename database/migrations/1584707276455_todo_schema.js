'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments().unsigned();
      table.integer('user_id').unsigned();
      table.string('title', 50);
      table.text('text');
      table.timestamps();
      table.string('deleted_at', 1).defaultTo('n');
    });
  }

  down () {
    this.drop('todos');
  }
}

module.exports = TodoSchema
