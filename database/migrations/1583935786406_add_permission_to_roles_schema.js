'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPermissionToRolesSchema extends Schema {
  up () {
    this.table('roles', (table) => {
      table.json('permissions').nullable();
    })
  }

  down () {
    this.table('roles', (table) => {
      table.dropColumn('permissions');
    })
  }
}

module.exports = AddPermissionToRolesSchema
