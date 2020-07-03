'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DictionariesSchema extends Schema {
  up () {
    this.create('dictionaries', (table) => {
      table.increments().unsigned();
      table.string('title', 50);
      table.json('words');
      table.timestamps();
    })
  }

  down () {
    this.drop('dictionaries')
  }
}

module.exports = DictionariesSchema
