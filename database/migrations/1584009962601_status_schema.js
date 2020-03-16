'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments();
      table.string('name');
      table.string('type');
      table.timestamps();
    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
