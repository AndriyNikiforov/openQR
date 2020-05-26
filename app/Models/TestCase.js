'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TestCase extends Model {
  async projects() {
    return this.hasOne('App/Models/Project');
  }

  async statuses() {
    return this.belongsTo('App/Models/Status');
  }

  async priorities() {
    return this.belongsTo('App/Models/Priority');
  }

  async actions() {
    return this.belongsTo('App/Models/Action');
  }
}

module.exports = TestCase
