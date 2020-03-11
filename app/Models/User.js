'use strict'

const Model = use('Model')

class User extends Model {
  async roles() {
    return this.hasOne('App/Models/Role');
  }

  async projects() {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = User
