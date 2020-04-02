'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BoardColumn extends Model {
  async boards() {
    return this.hasOne('App/Models/Board');
  }

  async boardColumnRows() {
    return this.belongsTo('App/Models/BoardColumnRow');
  }
}

module.exports = BoardColumn
