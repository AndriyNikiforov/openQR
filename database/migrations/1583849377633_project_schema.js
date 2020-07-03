'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments().unsigned();
      table.string('title', 50);
      table.string('description', 255);
      table.text('technical_info');
      table.integer('user_id').unsigned();
      table.string('deleted', 1).defaultTo('n');
      table.timestamps();
    });
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
