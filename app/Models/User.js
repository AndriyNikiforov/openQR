'use strict'

const Model = use('Model')

class User extends Model {
  async roles() {
    return this.hasOne('App/Models/Role');
  }

  async projectMembers() {
    return this.hasOne('App/Models/ProjectMember');
  }

  async projects() {
    return this.belongsTo('App/Models/Project');
  }

  async priorities() {
    return this.belongsTo('App/Models/Priority');
  }

  async todos() {
    return this.belongsTo('App/Models/Todo')
  }

  async inviteMails() {
    return this.belongsTo('App/Models/InviteMail');
  }

  async bugReports() {
    return this.belongsTo('App/Models/BugReport');
  }

  async projectComments() {
    return this.belongsTo('App/Models/ProjectComment');
  }

  async securityErrors() {
    return this.belongsTo('App/Models/SecurityError');
  }
}

module.exports = User
