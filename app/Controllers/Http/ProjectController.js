'use strict'

const dayjs = require('dayjs');
const Project = use('App/Models/Project');
const ProjectService = use('App/Services/ProjectService');
const ProjectMember = use('App/Models/ProjectMember');

class ProjectController {
  async index({ params, view }) {
    let { id, page } = params;
    page = page || 1;
    const viewData = await ProjectService.list(id, page);

    return view.render('project.index', viewData);
  }

  async createPage({ view }) {
    return view.render('project.create');
  }

  async editPage({ params, view, response }) {
    const { id } = params;
    const projectData = await Project.find(id);
    projectData.created_at = dayjs(projectData.created_at)
    .format('YYYY-DD-MM');

    return view.render('project.edit', {
      project: projectData
    });
  }

  async store({ request, response, auth }) {
    let data = request.only([
      'title',
      'description',
      'technical_info',
    ]);

    data.user_id = auth.user.id;
    const project = new Project();
    const projectMember = new ProjectMember();

    project.fill(data);
    await project.save();

    projectMember.fill({
      user_id: data.user_id,
      project_id: project.id
    });
    await projectMember.save();

    return response.route('project', { id: project.id });
  }

  async update({ request, response, auth }) {
    const data = request.only([
      'id',
      'title',
      'description',
      'technical_info'
    ]);

    data.user_id = auth.user.id;
    await Project.query()
      .where('id', data.id)
      .update(data);

    return response.route('project', { id: data.id });
  }

  async delete({ params, response }) {
    const { id } = params;
    const project = await Project.find(id);

    project.deleted = 'y';
    await project.save();

    return response.route('dashboard');
  }
}

module.exports = ProjectController
