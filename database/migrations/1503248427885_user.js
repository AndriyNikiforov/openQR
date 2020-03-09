'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('full_name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('role_id')
      table.timestamps()
      table.timestamp('deleted_at', 0)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
