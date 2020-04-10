'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SecurityError extends Model {
  async users() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = SecurityError
