'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments().unsigned();
      table.string('name', 50);
      table.string('type', 50);
      table.string('color', 50);
      table.timestamps();
    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
