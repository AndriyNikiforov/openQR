'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Board extends Model {
  async boardColumns() {
    return this.belongsTo('App/Models/BoardColumn');
  }
}

module.exports = Board
