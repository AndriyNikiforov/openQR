'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectNewsSchema extends Schema {
  up () {
    this.create('project_news', (table) => {
      table.increments().unsigned();
      table.string('title', 50);
      table.text('text');
      table.integer('user_id').unsigned();
      table.integer('project_id').unsigned();
      table.timestamps();
      table.date('deleted_at');
    })
  }

  down () {
    this.drop('project_news')
  }
}

module.exports = ProjectNewsSchema
