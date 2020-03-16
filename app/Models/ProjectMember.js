'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectMember extends Model {
  async users() {
    return this.belongsTo('App/Models/User');
  }

  async projects() {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = ProjectMember
