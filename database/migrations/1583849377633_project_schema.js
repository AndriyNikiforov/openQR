'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments().unsigned()
      table.string('title')
      table.string('description')
      table.text('technical_info')
      table.integer('user_id')
      table.timestamps()
      table.string('deleted').defaultTo('n')
    });
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
