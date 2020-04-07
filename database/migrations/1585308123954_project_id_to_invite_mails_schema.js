'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectIdToInviteMailsSchema extends Schema {
  up () {
    this.table('invite_mails', (table) => {
      table.integer('project_id');
    })
  }

  down () {
    this.table('invite_mails', (table) => {
      table.dropColumn('project_id');
    })
  }
}

module.exports = ProjectIdToInviteMailsSchema
