'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BugReportSchema extends Schema {
  up () {
    this.create('bug_reports', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.text('text');
      table.integer('user_id');
      table.integer('project_id');
      table.timestamps();
    })
  }

  down () {
    this.drop('bug_reports')
  }
}

module.exports = BugReportSchema
