'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSecretWordColumnUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('secret_word');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('secret_word');
    })
  }
}

module.exports = AddSecretWordColumnUsersSchema
