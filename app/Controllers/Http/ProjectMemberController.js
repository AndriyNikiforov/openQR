'use strict'

const Database = use('Database');
const ProjectMember = use('App/Models/ProjectMember');
const ProjectMemberService = use('App/Services/ProjectMemberService');

class ProjectMemberController {
  async index({ params, view }) {
    const { id } = params;
    const viewData = await ProjectMemberService
      .list(id);

    return view.render('project_member.index', viewData);
  }

  async addMember({ params, view }) {
    const { id, mailId } = params;
    const viewData = await ProjectMemberService
      .addMemberData(id, mailId);

    return view.render('project_member.detail_create', viewData);
  }

  async addToProject({ params, view }) {
    const { id } = params;
    const viewData = await ProjectMemberService
      .addToProjectData(id);

    return view.render('project_member.detail_create', viewData);
  }

  async createPage({ view }) {
    const viewData = await ProjectMemberService
      .createPageData();

    return view.render('project_member.create', viewData);
  }

  async create({ request, response }) {
    const projectMemberData = request.only([
      'user_id',
      'project_id'
    ]);
    const projectMember = new ProjectMember();

    projectMember.fill(projectMemberData);
    await projectMember.save();

    return response.route('project-members', {
      id: projectMember.project_id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const projectMember = await ProjectMember
      .find(id);

    await projectMember.delete();
    return response.route('back')
  }
}

module.exports = ProjectMemberController
