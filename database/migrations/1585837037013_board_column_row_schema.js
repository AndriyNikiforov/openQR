'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardColumnRowSchema extends Schema {
  up () {
    this.create('board_column_rows', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('time_estimated');
      table.string('time_tracked');
      table.integer('board_column_id');
      table.timestamps();
    })
  }

  down () {
    this.drop('board_column_rows');
  }
}

module.exports = BoardColumnRowSchema
