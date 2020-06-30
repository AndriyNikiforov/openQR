'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardSchema extends Schema {
  up () {
    this.create('boards', (table) => {
      table.increments();
      table.string('title');
      table.integer('project_id');
      table.string('deleted_at')
        .defaultTo('n');
      table.timestamps();
    })
  }

  down () {
    this.drop('boards');
  }
}

module.exports = BoardSchema
