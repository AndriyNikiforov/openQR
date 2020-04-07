'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardColumnSchema extends Schema {
  up () {
    this.create('board_columns', (table) => {
      table.increments();
      table.string('title');
      table.integer('board_id');
      table.timestamps();
    })
  }

  down () {
    this.drop('board_columns');
  }
}

module.exports = BoardColumnSchema
