'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Action extends Model {
  async testCases() {
    return this.hasOne('App/Models/TestCase');
  }
}

module.exports = Action
