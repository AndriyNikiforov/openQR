'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteMailsSchema extends Schema {
  up () {
    this.create('invite_mails', (table) => {
      table.increments().unsigned();
      table.string('email', 50);
      table.string('message', 50);
      table.integer('user_id').unsigned();
      table.integer('project_id').unsigned();
      table.timestamps();
    });
  }

  down () {
    this.drop('invite_mails');
  }
}

module.exports = InviteMailsSchema
