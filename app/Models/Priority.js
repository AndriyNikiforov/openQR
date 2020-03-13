'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Priority extends Model {
  async test_cases() {
    return this.hasOne('App/Models/TestCase');
  }

  async users() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = Priority
