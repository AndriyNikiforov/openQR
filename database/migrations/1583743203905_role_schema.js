'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('title')
      table.string('slug')
      table.timestamps()
      table.timestamp('deleted_at', 0)
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
