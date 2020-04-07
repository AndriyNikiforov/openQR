'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BoardColumnRow extends Model {
  async boardColumns() {
    return this.hasOne('App/Models/BoardColumn');
  }
}

module.exports = BoardColumnRow
