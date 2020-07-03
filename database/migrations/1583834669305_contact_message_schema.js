'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactMessageSchema extends Schema {
  up () {
    this.create('contact_messages', (table) => {
      table.increments().unsigned();
      table.string('email', 50).notNullable();
      table.string('message', 255).notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('contact_messages')
  }
}

module.exports = ContactMessageSchema
