'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardColumnRowsAddBoardIdSchema extends Schema {
  up () {
    this.table('board_column_rows', (table) => {
      table.integer('board_id');
    });
  }

  down () {
    this.table('board_column_rows', (table) => {
      table.dropColumn('board_id');
    });
  }
}

module.exports = BoardColumnRowsAddBoardIdSchema
