'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments();
      table.string('title', 50);
      table.text('description');
      table.date('event_date');
      table.timestamps();
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
