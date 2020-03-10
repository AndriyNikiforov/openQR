'use strict'

const Model = use('Model')

class User extends Model {
  async roles() {
    return this.hasOne('App/Models/Role');
  }
}

module.exports = User
