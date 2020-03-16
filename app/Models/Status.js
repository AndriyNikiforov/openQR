'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {
  async hasOne() {
    return this.hasOne('App/Models/TestCase');
  }
}

module.exports = Status
