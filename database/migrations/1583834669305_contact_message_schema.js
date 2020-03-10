'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactMessageSchema extends Schema {
  up () {
    this.create('contact_messages', (table) => {
      table.increments()
      table.string('email').notNullable()
      table.string('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_messages')
  }
}

module.exports = ContactMessageSchema
