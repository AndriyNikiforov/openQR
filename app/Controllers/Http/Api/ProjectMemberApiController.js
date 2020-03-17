'use strict'

const ProjectMember = use('App/Models/ProjectMember');

class ProjectMemberApiController {
  async add({ request, response }) {
    const projectMemberData = request.only([
      'user_id',
      'project_id'
    ]);

    await ProjectMember.create(projectMemberData);

    return response.json({
      status: 200,
      message: 'Success added'
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const projectMember = await ProjectMember.find(id);

    await projectMember.delete();

    return response.json({
      status: 200,
      message: 'Success removed'
    });
  }
}

module.exports = ProjectMemberApiController
