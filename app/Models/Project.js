'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  async users() {
    return this.hasOne('App/Models/User');
  }

  async testCases() {
    return this.belongsTo('App/Models/TestCase');
  }
}

module.exports = Project
