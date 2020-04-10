'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SecurityErrorSchema extends Schema {
  up () {
    this.create('security_errors', (table) => {
      table.increments();
      table.string('title');
      table.text('text');
      table.decimal('score');
      table.integer('user_id');
      table.timestamps();
    })
  }

  down () {
    this.drop('security_errors');
  }
}

module.exports = SecurityErrorSchema
