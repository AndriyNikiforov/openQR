'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  async projects() {
    return this.hasOne('App/Models/Project');
  }
}

module.exports = Event
