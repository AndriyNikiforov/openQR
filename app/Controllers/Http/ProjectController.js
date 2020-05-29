'use strict'

const Project = use('App/Models/Project');
const ProjectMember = use('App/Models/ProjectMember');
const ProjectService = use('App/Services/ProjectService');

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

  async search({ request, view }) {
    const data = request.only([
      'id',
      'query'
    ]);
    const viewData = await ProjectService
      .searchData(data.id, data.query);

    return view.render('project.search', viewData);
  }

  async editPage({ params, view }) {
    const { id } = params;
    const viewData = await ProjectService
      .editPageData(id);

    return view.render('project.edit', viewData);
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
