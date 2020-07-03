'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BugReportSchema extends Schema {
  up () {
    this.create('bug_reports', (table) => {
      table.increments().unsigned();
      table.string('title', 50);
      table.string('description', 250);
      table.text('text');
      table.integer('user_id').unsigned();
      table.integer('project_id').unsigned();
      table.timestamps();
    })
  }

  down () {
    this.drop('bug_reports')
  }
}

module.exports = BugReportSchema
