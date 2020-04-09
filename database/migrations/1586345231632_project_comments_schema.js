'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectCommentsSchema extends Schema {
  up () {
    this.create('project_comments', (table) => {
      table.increments();
      table.text('text');
      table.integer('user_id');
      table.integer('project_id');
      table.timestamps();
    })
  }

  down () {
    this.drop('project_comments');
  }
}

module.exports = ProjectCommentsSchema
