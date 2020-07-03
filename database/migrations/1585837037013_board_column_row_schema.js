'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardColumnRowSchema extends Schema {
  up () {
    this.create('board_column_rows', (table) => {
      table.increments().unsigned();
      table.string('title', 50);
      table.string('description', 255);
      table.integer('user_id').unsigned();
      table.float('time_estimated');
      table.float('time_tracked');
      table.integer('board_column_id').unsigned();
      table.integer('board_id').unsigned();
      table.timestamps();
    })
  }

  down () {
    this.drop('board_column_rows');
  }
}

module.exports = BoardColumnRowSchema
