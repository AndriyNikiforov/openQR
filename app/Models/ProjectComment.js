'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectComment extends Model {
  async users() {
    return this.hasOne('App/Models/User');
  }

  async projects() {
    return this.hasOne('App/Models/Project');
  }
}

module.exports = ProjectComment
