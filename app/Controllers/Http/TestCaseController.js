'use strict'

const TestCase = use('App/Models/TestCase');
const Database = use('Database');

class TestCaseController {
  async index({ params, view }) {
    const { id } = params;
    const testCaseData = await Database
      .select(
        'users.email',
        'users.full_name',
        'test_cases.title',
        'test_cases.steps',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .first();

    return view.render('test_case.index', {
      testCase: testCaseData
    });
  }

  async createPage({ view, params }) {
    const { id } = params;
    const projectData = await Database
      .select('title')
      .where('id', id)
      .first();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return view.render('test_case.create', {
      project: projectData,
      statuses: statusesData
    });
  }

  async editPage({ params, view }) {
    const { id } = params;
    const testCaseData = await Database
      .select(
        'users.email',
        'users.full_name',
        'test_cases.title',
        'test_cases.steps',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .first();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return view.render('test_case.edit', {
      testCase: testCaseData,
      statuses: statusesData
    });
  }

  async store({ request, response }) {
    const testCaseData = request.only([
      'title',
      'steps',
      'user_id',
      'status_id',
      'project_id',
      'description'
    ]);

    await TestCase.create(testCaseData);

    return response.route('project', {
      id: testCaseData.project_id
    });
  }

  async update({ request, response }) {
    const testCaseData = request.only([
      'id',
      'title',
      'steps',
      'user_id',
      'status_id',
      'project_id',
      'description'
    ]);

    await Database
      .table('test_cases')
      .where('id', testCaseData.id)
      .update(testCaseData);

    return response.route('project', {
      id: testCaseData.project_id
    });
  }

  async delete({ params, response }) {
    const { id } = params;
    const testCase = await TestCase.find(id);

    await testCase.delete();
    return response.route('back');
  }
}

module.exports = TestCaseController
