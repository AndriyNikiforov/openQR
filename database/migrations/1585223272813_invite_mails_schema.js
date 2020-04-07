'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteMailsSchema extends Schema {
  up () {
    this.create('invite_mails', (table) => {
      table.increments();
      table.string('email');
      table.string('message');
      table.integer('user_id');
      table.timestamps();
    });
  }

  down () {
    this.drop('invite_mails');
  }
}

module.exports = InviteMailsSchema
