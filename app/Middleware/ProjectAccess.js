'use strict'

const ProjectMember = use('App/Models/ProjectMember');

class ProjectAccess {
  async handle ({ params, response, auth }, next) {
    const dataRequest = params;
    const user = auth.user.id;
    let dataMember = await ProjectMember
      .query()
      .select('user_id')
      .where('project_id', dataRequest.id)
      .where('user_id', user)
      .first();
    dataMember = (dataMember == null) ? 0 : dataMember;

    if (dataMember.user_id != user) {
      return response.route('invite-form');
    }

    await next();
  }
}

module.exports = ProjectAccess;
