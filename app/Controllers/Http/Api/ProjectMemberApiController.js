'use strict'

const ProjectMember = use('App/Models/ProjectMember');
const ProjectMemberService = use('App/Services/ProjectMemberService');

class ProjectMemberApiController {
  async list({ params, response }) {
    const { id } = params;

    const responseData = await ProjectMemberService.list(id);
    return response.json(responseData);
  }

  async addData({ response }) {
    const responseData = await ProjectMemberService
      .createPageData();

    return response.json(responseData);
  }

  async updateData({ params, response }) {
    const { id } = params;
    const responseData = await ProjectMemberService
      .updatePageData(id);

    return response.json(responseData);
  }

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

  async update({ request, response }) {
    const projectMemberData = request.only([
      'id',
      'user_id',
      'project_id'
    ]);
    const projectMember = await ProjectMember
      .find(projectMemberData.id);

    projectMember.merge(projectMemberData);
    await projectMember.save();

    return response.json({
      status: 200,
      message: 'Success updated'
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
