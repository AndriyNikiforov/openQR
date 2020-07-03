'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectMembersSchema extends Schema {
  up () {
    this.create('project_members', (table) => {
      table.increments().unsigned();
      table.integer('user_id').unsigned();
      table.integer('project_id').unsigned();
      table.timestamps();
    })
  }

  down () {
    this.drop('project_members')
  }
}

module.exports = ProjectMembersSchema
