'use strict'

const dayjs = require('dayjs');
const Project = use('App/Models/Project');
const Database = use('Database');

class ProjectController {
  async index({ params, view, response }) {
    let { id, page } = params;
    page = page || 1;

    const projectData = await Project.find(id);
    projectData.created_at = dayjs(projectData.created_at)
      .format('YYYY-DD-MM');

    const testCasesData = await Database
      .select(
        'users.full_name',
        'statuses.name as status_name',
        'statuses.type as status_type',
        'test_cases.title as test_case_name',
        'test_cases.deleted as test_case_deleted'
      ).from('test_cases')
      .where('test_cases.project_id', id)
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .paginate(page, 8)

    return view.render('project.index', {
      project: projectData,
      testCases: testCasesData
    });
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
    const project = await Project.create(data);

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
